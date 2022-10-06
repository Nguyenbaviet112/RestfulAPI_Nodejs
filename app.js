import express from 'express';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import actorRouter from './routes/actor.route.js';
import filmRouter from './routes/film.route.js';
import Options from './swagger/swagger.js';

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(morgan('combined'));

const swaggerDocs = swaggerJSDoc(Options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/actors', actorRouter) 
app.use('/api/films', filmRouter)


app.listen(PORT, function ()
{
    console.log(`App is listening at http://localhost: ${PORT}`);
});

