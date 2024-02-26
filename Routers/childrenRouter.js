const express = require("express");
const router = express.Router();
const {body, param} = require("express-validator");
const controller = require("./../Controllers/childrenController");
const isAuth = require("./../Middlewares/isAuth");

router.route("/children")
        /**
         * @swagger
         * /children:
         *   get:
         *     description: Get all children
         *     responses:
         *       '201':
         *         description: Array of all children
         *       '402':
         *         description: Not authonticated
         */
        .get(isAuth, controller.GetAllChildren)
        /**
         * @swagger
         * /children:
         *   post:
         *     description: Add new child account
         *     parameters:
         *       - name: id
         *         in: body
         *         required: true
         *         type: number
         *       - name: name
         *         in: body
         *         required: true
         *         type: string
         *       - name: email
         *         in: body
         *         required: true
         *         type: string
         *       - name: password
         *         in: body
         *         required: true
         *         type: string
         *      - name: age
         *         in: body
         *         required: true
         *         type: number
         *      - name: level
         *         in: body
         *         required: true
         *         type: string
         *      - name: address
         *         in: body
         *         required: true
         *         type: string
         *     responses:
         *       '201':
         *         description: the added child object
         *       '402':
         *         description: Not authorized
         */
        .post([
            body("id").isInt().withMessage("Id must be a number"),
            body("name").isAlpha().withMessage("name must contain only alphatics")
                        .isLength({min:3, max:10}).withMessage("Name length must be between 3 and 10 characters"),
            body("email").isEmail().withMessage("Invalid email format"),
            body("password").isLength({min:5, max:15}).withMessage("Password length must be between 5 and 15 characters"),
            body("age").isInt().withMessage("Age must be a number"),
            body("level").matches(/^(PreKG|KG1|KG2)$/).withMessage("level must be one of PreKG, KG1, KG2")
        ], controller.insertChild)
        /**
         * @swagger
         * /children:
         *   post:
         *     description: Update an existing child
         *     parameters:
         *       - name: id
         *         in: body
         *         required: true
         *         type: number
         *       - name: name
         *         in: body
         *         required: true
         *         type: string
         *       - name: email
         *         in: body
         *         required: true
         *         type: string
         *       - name: password
         *         in: body
         *         required: true
         *         type: string
         *      - name: age
         *         in: body
         *         required: true
         *         type: number
         *      - name: level
         *         in: body
         *         required: true
         *         type: string
         *      - name: address
         *         in: body
         *         required: true
         *         type: string
         *     responses:
         *       '201':
         *         description: the old child object (before updating)
         *       '402':
         *         description: Not authorized
         */
        .patch(isAuth,[
            body("id").isInt().withMessage("Id must be a number"),
            body("name").isAlpha().withMessage("name must contain only alphatics")
                        .isLength({min:3, max:10}).withMessage("Name length must be between 3 and 10 characters"),
            body("email").isEmail().withMessage("Invalid email format"),
            body("password").isLength({min:5, max:15}).withMessage("Password length must be between 5 and 15 characters"),
            body("age").isInt().withMessage("Age must be a number"),
            body("level").matches(/^(PreKG|KG1|KG2)$/).withMessage("level must be one of PreKG, KG1, KG2")
        ], controller.updateChild)
        /**
         * @swagger
         * /children:
         *   delete:
         *     description: Delete a child with a specific id
         *     parameters:
         *       - name: id
         *         in: body
         *         required: true
         *         type: number
         *     responses:
         *       '201':
         *         description: The deleted object
         *       '402':
         *         description: Not authonticated
         */
        .delete(isAuth,[
            body("id").isInt().withMessage("Id must be a number"),
        ], controller.deleteChild)

/**
 * @swagger
 * /children/changePassword/:id:
 *   patch:
 *     description: Change the password of an existing child
 *     parameters:
 *       - name: id
 *         in: params
 *         required: true
 *         type: number
 *       - name: password
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       '201':
 *         description: The old updated object
 *       '402':
 *         description: Not authonticated
 */
router.patch("/children/changePassword/:id",isAuth,
[
    param("id").isInt().withMessage("Id must be a number"),
    body("password").isLength({min:5, max:15}).withMessage("Password length must be between 5 and 15 characters")
], controller.changePassword)

/**
 * @swagger
 * /children/:id:
 *   patch:
 *     description: get a child by his id
 *     parameters:
 *       - name: id
 *         in: params
 *         required: true
 *         type: number
 *     responses:
 *       '201':
 *         description: The child object
 *       '402':
 *         description: Not authonticated
 *       '422':
 *          description: Validation error
 */
router.get("/children/:id", isAuth, [
    param("id").isInt().withMessage("The id must be an int")
], controller.getChildByID)

module.exports = router;