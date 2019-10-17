import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

export const swagger = express.Router();

const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'ElifTechSchool API',
    version: '0.0.0',
    description: 'Documentation about all ElifTechSchool API calls',
  },
  servers: [
    { url: '/api' },
  ],
  // basePath: '/api',
  components: {
    schemas: {
      400: {
        description: 'Validation exception.',
        type: 'object',
        required: ['message'],
        properties: {
          message: {
            type: 'string',
            default: 'Validation exception'
          }
        },
      },
      401: {
        description: 'Unauthorized access.',
        type: 'object',
        required: ['message'],
        properties: {
          message: {
            type: 'string',
            default: 'Unauthorized access'
          }
        },
      },
      404: {
        description: 'Page not found.',
        type: 'object',
        required: ['message'],
        properties: {
          message: {
            type: 'string',
            default: 'Page not found'
          }
        },
      },
      500: {
        description: 'Server error.',
        type: 'object',
        required: ['message'],
        properties: {
          message: {
            type: 'string',
            default: 'Server error'
          }
        },
      },
    },
  },
};

export const swaggerSpec = swaggerJSDoc({ swaggerDefinition, apis: ['./src/controllers/*.js'] });
// swaggerSpec.openapi=  "3.0.1",

swagger.use('/', swaggerUi.serve);
swagger.get('/', swaggerUi.setup(swaggerSpec));
