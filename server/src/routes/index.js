import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import express from 'express';
import example from '../controllers/exampleController.js';

const router = express.Router();

const swaggerDefinition = {
  info: {
    title: 'ElifTechSchool API',
    version: '0.0.0',
    description: 'Documentation about all ElifTechSchool API calls',
  },
  basePath: '/api',
};

const swaggerSpec = swaggerJSDoc({ swaggerDefinition, apis: ['./src/controllers/*.js'] });

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec));
router.use('/api/v1/examples', example);

export default router;
