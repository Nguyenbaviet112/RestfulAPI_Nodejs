const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
  },
};

export default {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['routes/film.route.js'],
};

