import express from 'express';
import morgan from 'morgan';

import actorRouter from './routes/actor.route.js'

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(morgan('combined'));


app.get('/', function (req, res) {
    res.json(
        {
            msg: 'Hello from expressjs'
        }
    );
});


app.use('/api/actors', actorRouter)


app.listen(PORT, function ()
{
    console.log(`App is listening at http://localhost: ${PORT}`);
});

