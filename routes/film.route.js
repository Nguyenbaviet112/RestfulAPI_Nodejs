import filmModel from '../models/film.model.js'
import validate from '../middle_wares/validate.mdw.js';
import {readFile} from 'fs/promises'
import express from 'express';


const router = express.Router();
const schema = JSON.parse(await readFile(new URL('../schemas/film.json', import.meta.url)));


router.get('/', async function (req, res)
{
    const list = await filmModel.findAll();
    res.json(list);

});


router.get('/:id', async function (req, res)
{
    const id = req.params.id || 0;
    const film = await filmModel.findById(id);

    if (film === null)
    {
        return res.status(204).end();
    }

    res.json(film);

});



router.post('/', validate(schema), async function (req, res)
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



router.delete('/:id', async function(req, res)
{
    const id = req.params.id || 0;

    console.log(id);

    const n = await filmModel.del(id);
    res.json(
        {
            affected: n
        }
    );
});


export default router;