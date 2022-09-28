import db from '../utils/db.js';

export function findAll ()
{
    return db('actor');
}

export async function findById (id)
{
    const list = await db('actor').where('actor_id', id);

    

    if (list.length === 0)
    {
        return null;
    }

    return list[0];

}

export function add (actor)
{
    return db('actor').insert(actor);
}

export function del(id)
{
    return db('actor').where('actor_id', id).del();
}