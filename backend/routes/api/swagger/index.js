const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const swaggerJSDoc = require('swagger-jsdoc');
// eslint-disable-next-line import/no-extraneous-dependencies
const swaggerUi = require('swagger-ui-express');

const router = express.Router();

router.use(express.json());

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Moesland API',
      version: '1.0.0',
      description: 'Moesland API documentation using Swagger.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
    models: { // schemas of ALL models from ./backend/models/*.js from all mongoose.model() calls
      location: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          latitude: {
            type: 'number',
          },
          longitude: {
            type: 'number',
          },
          radius: {
            type: 'number',
          },
        },
      },
      event: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          startdate: {
            type: 'string',
          },
          enddate: {
            type: 'string',
          },
          location: {
            type: 'string',
          },
          isParade: {
            type: 'boolean',
          },
          latitude: {
            type: 'number',
          },
          longitude: {
            type: 'number',
          },
          radius: {
            type: 'number',
          },
        },
      },
      user: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          role: {
            type: 'string',
          },
        },
      },
    },
  },
  apis: ['./routes/api/**/*.js'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger API documentation
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
