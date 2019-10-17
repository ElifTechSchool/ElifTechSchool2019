import express from 'express';
import usersRolesService from '../businessLogic/usersRolesService.js';

const router = express.Router();

// just for testing user roles
router.get('/', (req, res, next) => {
  usersRolesService
    .getUserRoles()
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

export default router;
