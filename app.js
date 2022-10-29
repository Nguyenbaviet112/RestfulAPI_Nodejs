import express from 'express';
import morgan from 'morgan';
import {readFile} from 'fs/promises'
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'

import actorRouter from './routes/actor.route.js';
import filmRouter from './routes/film.route.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import auth from './middle_wares/auth.mdw.js'
 

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: '*',
        methods: 'GET,PATCH,POST,DELETE'
    }
));
//app.use(morgan('combined'));

const swaggerDocs = JSON.parse(await readFile(new URL('./swagger/swagger.json', import.meta.url)));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/actors', actorRouter) 
app.use('/api/films',auth, filmRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)


app.listen(PORT, function ()
{
    console.log(`App is listening at http://localhost: ${PORT}`);
});

