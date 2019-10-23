import express from 'express';
import usersRolesService from '../businessLogic/usersRolesService.js';

const router = express.Router();

// just for testing user roles
/*router.get('/', (req, res, next) => {
  usersRolesService
    .getUserRoles()
    .then((result) => res.json(result))
    .catch((error) => next(error));
});
*/

/**
 * @swagger
 *
 * /v1/users/{id}/roles:
 *   get:
 *     description: get role of a user
 *     tags:
 *       - usersRoles
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: response
 *         schema:
 *           type: object
 *           properties:
 *             roles:
 *               type: array
 *               items:
 *                 type: number
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */
router.get('/:id/roles', (req, res, next) => {
  usersRolesService.getRolesOfSpecificUser(req.params.id)
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
 *       - usersRoles
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
  const { roles } = req.body;
  if (!userId || !Array.isArray(roles)) {
    res.status(401).send({ error: 'incorest data' });
  }
  usersRolesService.deleteRolesByUser(userId);
  usersRolesService.createUserRoles(
    roles.map((role) => ({ role_id: role, user_id: userId })),
  )
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

export default router;
