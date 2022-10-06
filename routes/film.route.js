import filmModel from '../models/film.model.js'
import validate from '../middle_wares/validate.mdw.js';
import {readFile} from 'fs/promises'
import express from 'express';


const router = express.Router();
const schema = JSON.parse(await readFile(new URL('../schemas/film.json', import.meta.url)));



/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSON users.
 *     description: Retrieve a list of users from JSON.
 *     responses:
 *       200:
 *         description: A list of users
 *         schema:
 *           properties:
 *             Film:
 *                 type: object
 *                 properties:
 *                   film_id:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 0
 *                   title:
 *                     type: string
 *                     description: The user's name.
 *                     example: Leanne Graham
 *                   description:
 *                     type: string
 *                     description: The user's name.
 *                     example: Leanne Graham
 *                   release_year:
 *                     type: int
 *                     description: The user's name.
 *                     example: 2006
 *                   language_id:
 *                     type: int
 *                     description: The user's name.
 *                     example: 1
 *                   original_language_id:
 *                     type: int
 *                     description: The user's name.
 *                     example: 1
 *                   rental_duration:
 *                     type: int
 *                     description: The user's name.
 *                     example: 6
 *                   rental_rate:
 *                     type: string
 *                     description: The user's name.
 *                     example: 4.99
 *                   length:
 *                     type: int
 *                     description: The user's name.
 *                     example: 63
 *                   replacement_cost:
 *                     type: string
 *                     description: The user's name.
 *                     example: 24.99
 *                   rating:
 *                     type: string
 *                     description: The user's name.
 *                     example: NC-17
 *                   special_features:
 *                     type: string
 *                     description: The user's name.
 *                     example: Trailers,Deleted Scenes
 *                   last_update:
 *                     type: string
 *                     description: The user's name.
 *                     example: 2006-02-14T22:03:42.000Z
 * 
 * 
 * 
 * 
 * 
 */
router.get('/', async function (req, res)
{
    const list = await filmModel.findAll();
    res.json(list);

});

/**
 * @swagger
 * /api/films/{id}:
 *   get:
 *     tags:
 *       - Films
 *     description: Returns a single film
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: film id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single film
 */
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


/**
 * @swagger
 * /api/films:
 *   post:
 *     tags:
 *       - Films
 *     description: Creates a new film
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: film
 *         description: Film object
 *         in: body
 *         required: true
 *     responses:
 *       201:
 *         description: Successfully created
 */
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


/**
 * @swagger
 * /api/films/{id}:
 *   delete:
 *     tags:
 *       - Films
 *     description: Deletes a single film
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Film id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: affected
 */
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