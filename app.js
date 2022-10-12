import express from 'express';
import morgan from 'morgan';
import {readFile} from 'fs/promises'
import swaggerUi from 'swagger-ui-express';

import actorRouter from './routes/actor.route.js';
import filmRouter from './routes/film.route.js';

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(morgan('combined'));

const swaggerDocs = JSON.parse(await readFile(new URL('./swagger/swagger.json', import.meta.url)));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/actors', actorRouter) 
app.use('/api/films', filmRouter)


app.listen(PORT, function ()
{
    console.log(`App is listening at http://localhost: ${PORT}`);
});

