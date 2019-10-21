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
 *     parameters: []
 *     responses:
 *       200:
 *         description: response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                    name:
 *                      type: string
 *                    description:
 *                      type: string
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 */
router.get('/', (req, res, next) => {
  rolesService.getRoles(req.query)
    .then((data) => res.json({ data }))
    .catch((error) => next(error));
});


router.post('/', (req, res, next) => {
  rolesService.createRole(req.body)
    .then(() => res.status(201).end())
    .catch((error) => next(error));
});

export default router;
