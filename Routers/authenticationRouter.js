const express = require("express");
const router = express.Router();
const controller = require("./../Controllers/authenticationController");

/**
 * @swagger
 * /login:
 *   get:
 *     description: Login to the system
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       '201':
 *         description: jwt token
 *       '500':
 *         description: email or password is invalid
 */
router.get("/login", controller.logIn);

module.exports = router;