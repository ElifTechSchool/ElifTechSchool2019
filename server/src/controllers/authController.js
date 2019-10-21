import express from 'express';
import authService from '../businessLogic/authService.js';


const router = express.Router();


/**
 * @swagger
 *
 * /v1/login:
 *   post:
 *     description: Get user by email
 *     tags:
 *       - auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: response
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
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
router.post('/', async (req, res) => {
  try {
    const result = await authService.login(req.body);
    if (result) {
      res.send(result);
    } else {
      res.status(401).end();
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
