import {readFile} from 'fs/promises';
import express from 'express';
import validate from '../middle_wares/validate.mdw.js';
import userModel from '../models/user.model.js';
import logging from '../middle_wares/logging.mdw.js';
import bcrypt from 'bcryptjs';


const router = express.Router();
const schema = JSON.parse(await readFile(new URL('../schemas/user.json', import.meta.url)));


router.post('/', logging, validate(schema), async function (req, res)
{
    let user = req.body;

    user.password = bcrypt.hashSync(user.password, 10)

    const ret = await userModel.add(user);


    user = {
        user_id: ret[0],
        ...user
    }

    delete user.password;

    res.status(201).json(user);
});

export default router