import {readFile} from 'fs/promises';
import express from 'express';
import jwt from 'jsonwebtoken'
import randomstring from 'randomstring';

import validate from '../middle_wares/validate.mdw.js';
import userModel from '../models/user.model.js';
import logging from '../middle_wares/logging.mdw.js';
import bcrypt from 'bcryptjs';


const router = express.Router();
const schema = JSON.parse(await readFile(new URL('../schemas/login.json', import.meta.url)));
const rfschema = JSON.parse(await readFile(new URL('../schemas/rf.json', import.meta.url)));


router.post('/', logging, validate(schema), async function (req, res)
{
    const user = await userModel.findByUsername(req.body.username);

    if (user == null)
    {
        return res.status(401).json({
            authenticated : false
        });
    }

    if (bcrypt.compareSync(req.body.password, user.password) == false){
        return res.status(401).json({
            authenticated : false
        });
    }


    const payload = {
        userId : user.id
    }

    const opts = {
        expiresIn: 10 * 60
    }

    const accessToken = jwt.sign(payload, 'SECRET_KEY', opts);


    const refreshToken = randomstring.generate(80);

    await userModel.patch(user.id, {
        rfToken: refreshToken
    });

    res.json({
        authenticated : true,
        accessToken,
        refreshToken
    })

});



router.post('/refresh', logging, validate(rfschema), async function (req, res)
{
    const { accessToken, refreshToken } = req.body;
    

    try {

        const opts = {
            ignoreExpiration: true
        };

        const {userId} = jwt.verify(accessToken, 'SECRET_KEY', opts);


        const ret = await userModel.isValidRefreshToken(userId, refreshToken);
        
        if (ret === true){
            const newAccessToken = jwt.sign({userId}, 'SECRET_KEY', {expiresIn: 600});
            return res.status(200).json({
                accessToken: newAccessToken
            })
        }


        return res.status(401).json({
            message: 'RefreshToken is revoked.'
        })

    } catch(err){
        console.error(err);
        return res.status(401).json({
            message: 'Invalid accessToken.'
        })
    }
});

export default router