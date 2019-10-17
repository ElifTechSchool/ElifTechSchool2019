import express from 'express';
import usersService from '../businessLogic/usersService.js';
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
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: response
 *         schema:
 *           type: boolean
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/components/schemas/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/components/schemas/500'
 */
router.post('/', async (req, res) => {
  try {
    const result = await authService.login(req.body);
    if (result) {
      res.send(result)
    } else {
      res.status(401).end()
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
