import express from 'express';
import swagger from './swagger.js';
import tasks from '../controllers/tasksController.js';
import example from '../controllers/exampleController.js';
import rank from '../controllers/rankController.js';
import events from '../controllers/eventsController.js';
import achievements from '../controllers/achievementsController.js';
import users from '../controllers/usersController.js';
import competitions from '../controllers/competitionController.js';
import auth from '../controllers/authController.js';
import sessions from '../controllers/sessionController.js';
import roles from '../controllers/rolesController.js';
import usersRoles from '../controllers/usersRolesController.js';


const router = express.Router();

router.use('/', swagger);
router.use('api/v1/tasks', tasks);
router.use('/api/v1/examples', example);
router.use('/api/v1/ranks', rank);
router.use('/api/v1/events', events);
router.use('/api/v1/users', users);
router.use('/api/v1/competitions', competitions);
router.use('/api/v1/achievements', achievements);
router.use('/api/v1/login', auth);
router.use('/api/v1/tokens', sessions);
router.use('/api/v1/roles', roles);
router.use('/api/v1/users_roles', usersRoles);

export default router;
