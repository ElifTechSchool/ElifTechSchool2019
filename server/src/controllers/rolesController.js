import express from 'express';
import rolesService from '../businessLogic/rolesService.js';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/roles:
 *   get:
 *     description: Get roles
 *     tags:
 *       - roles
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: response
 *         schema:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */
router.get('/', (req, res, next) => {
  rolesService.getRoles(req.query)
    .then((data) => res.json({ data }))
    .catch((error) => next(error));
});

export default router;
