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


/**
 * @swagger
 *
 * /v1/users/{id}/roles:
 *   put:
 *     description: update users roles
 *     tags:
 *       - users_roles
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: array
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             roles:
 *               type: array
 *               items:
 *                 type: number
 *     responses:
 *       204:
 *         description: added success
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */

router.put('/:id/roles', async (req, res, next) => {
  const userId = req.params.id;
  if (!userId || !Array.isArray(req.body.roles)) {
    res.status(401).send({ error: 'incorest data' });
  }
  const userRoles = await usersRolesService.getRolesOfSpecificUser(userId);
  const rolesToAdd = req.body.roles.filter((r) => userRoles.indexOf(r) === -1);
  if (!rolesToAdd.length) {
    res.send({ message: 'roles already exist' });
    return;
  }
  usersRolesService.createUserRoles(
    rolesToAdd.map((role) => ({ role_id: role, user_id: userId })),
  )
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

export default router;
