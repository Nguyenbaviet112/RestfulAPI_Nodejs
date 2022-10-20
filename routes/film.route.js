import filmModel from '../models/film.model.js'
import validate from '../middle_wares/validate.mdw.js';
import logging from '../middle_wares/logging.mdw.js';
import {readFile} from 'fs/promises'
import express from 'express';
import secret from '../middle_wares/secret.mdw.js';


const router = express.Router();
const schema = JSON.parse(await readFile(new URL('../schemas/film.json', import.meta.url)));


router.get('/', logging, secret, async function (req, res)
{
    const list = await filmModel.findAll();
    res.json(list);

});


router.get('/:id', logging, async function (req, res)
{
    const id = req.params.id || 0;
    const film = await filmModel.findById(id);

    if (film === null)
    {
        return res.status(204).end();
    }

    res.json(film);

});



router.post('/', logging, validate(schema), async function (req, res)
{
    let film = req.body;

    const ret = await filmModel.add(film);

    film = 
    {
        film_id: ret[0],
        ...film
    }

    res.status(201).json(film);
});



router.delete('/:id', logging, async function(req, res)
{
    const id = req.params.id || 0;

    const n = await filmModel.del(id);
    res.json(
        {
            affected: n
        }
    );
});


export default router;