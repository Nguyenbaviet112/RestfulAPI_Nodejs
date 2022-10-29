import express from 'express';
import actorModel from '../models/actor.model.js';
import logging from '../middle_wares/logging.mdw.js';
import basic_authentication from '../middle_wares/authentication.mdw.js';

const router = express.Router();


router.get('/', basic_authentication, logging, async function (req, res)
{
    const list = await actorModel.findAll();
    res.json(list);


});

router.get('/:id', logging, async function (req, res)
{
    const id = req.params.id || 0;
    const actor = await actorModel.findById(id);

    if (actor === null)
    {
        return res.status(204).end();
    }

    res.json(actor);

});


router.post('/', logging, async function (req, res)
{
    let actor = req.body;

    const ret = await actorModel.add(actor);

    actor = 
    {
        actor_id: ret[0],
        ...actor
    }

    res.status(201).json(actor);
});


router.delete('/:id', logging, async function(req, res)
{
    const id = req.params.id || 0;

    console.log(id);

    const n = await actorModel.del(id);
    res.json(
        {
            affected: n
        }
    );
});


export default router;