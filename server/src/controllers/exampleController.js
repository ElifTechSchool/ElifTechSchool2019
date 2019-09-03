import express from 'express';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/examples:
 *   get:
 *     description: Get examples
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: response
 *         schema:
 *           type: array
 *           items:
 *              type: string
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */
router.get('/', function (req, res) {
  res.send('Birds home page')
});

/**
 * @swagger
 *
 * /v1/examples:
 *   post:
 *     description: add example
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             example:
 *               type: string
 *     responses:
 *       201:
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
router.post('/', function (req, res) {
  res.status(201).send('About birds')
});

/**
 * @swagger
 *
 * /v1/examples/:id:
 *   put:
 *     description: update example
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             example:
 *               type: string
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
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
router.put('/', function (req, res) {
  res.status(204).send('About birds')
});

/**
 * @swagger
 *
 * /v1/examples/:id:
 *   delete:
 *     description: update example
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: delete success
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */
router.delete('/', function (req, res) {
  res.status(204).send('About birds')
});

/**
 * @swagger
 *
 * definitions:
 *   401:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         default: Unauthorized access
 *     required:
 *       - message
 *   404:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         default: Information not found
 *     required:
 *       - message
 *   409:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         default: Already exist
 *     required:
 *       - message
 *   422:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         default: Error validating request
 *     required:
 *       - message
 *   500:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         default: Server error
 *     required:
 *       - message
 */
export default router;
