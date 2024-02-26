const express = require("express");
const router = express.Router();
const {body, param, query} = require("express-validator");
const controller = require("./../Controllers/teachersController");
const isAuth = require("./../Middlewares/isAuth");

router.route("/teachers")
        /**
         * @swagger
         * /teachers:
         *   get:
         *     description: Get all teachers
         *     responses:
         *       '201':
         *         description: Array of all teeachers
         *       '402':
         *         description: Not authonticated
         */
        .get(isAuth, controller.getAllTeachers)
        /**
         * @swagger
         * /teachers:
         *   post:
         *     description: Add new teacher account
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
         *         description: the added teacher object
         *       '402':
         *         description: Not authorized
         */
        .post(isAuth,[
            body("id").isInt().withMessage("Id must be a number"),
            body("name").isAlpha().withMessage("name must contain only alphatics")
                        .isLength({min:3, max:10}).withMessage("Name length must be between 3 and 10 characters"),
            body("email").isEmail().withMessage("Invalid email format"),
            body("password").isLength({min:5, max:15}).withMessage("Password length must be between 5 and 15 characters")
        ], controller.insertTeacher)
        /**
         * @swagger
         * /teachers:
         *   post:
         *     description: Update an existing teacher
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
         *         description: the old teacher object (before updating)
         *       '402':
         *         description: Not authorized
         */
        .patch(isAuth,[
            body("id").isInt().withMessage("Id must be a number"),
            body("name").isAlpha().withMessage("name must contain only alphatics")
                        .isLength({min:3, max:10}).withMessage("Name length must be between 3 and 10 characters"),
            body("email").isEmail().withMessage("Invalid email format"),
            body("password").isLength({min:5, max:15}).withMessage("Password length must be between 5 and 15 characters")
        ], controller.updateTeacher)
        /**
         * @swagger
         * /teachers:
         *   delete:
         *     description: Delete a teacher with a specific id
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
        ], controller.deleteTeacher)


/**
 * @swagger
 * /teachers/changePassword/:id:
 *   patch:
 *     description: Change the password of an existing teacher
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
router.patch("/teachers/changePassword/:id",isAuth,
[
    param("id").isInt().withMessage("Id must be a number"),
    body("password").isLength({min:5, max:15}).withMessage("Password length must be between 5 and 15 characters")
], controller.changePassword)


/**
 * @swagger
 * /teachers/:id:
 *   patch:
 *     description: get a teacher by his id
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
 *         description: Validation error
 */
router.get("/teachers/:id", isAuth, [
    param("id").isInt().withMessage("The id must be an int")
], controller.getTeacherByID)
module.exports = router;