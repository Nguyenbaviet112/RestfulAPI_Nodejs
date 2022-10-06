var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
};

export default {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['routes/film.route.js'],
};

