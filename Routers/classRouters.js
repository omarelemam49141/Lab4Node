const express = require('express');
const router = express.Router();
const { param, body } = require('express-validator');
const isAuth = require('./../Middlewares/isAuth');
const controller = require('./../Controllers/classController');

// Get all classes
/**
 * @swagger
 * /class:
 *   get:
 *     summary: Get all classes
 *     description: Retrieve a list of all classes.
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of classes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */
router.get("/class", isAuth, controller.getAllClasses);

// Get class by Id
/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Get class by ID
 *     description: Retrieve class information by its ID.
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the class to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Class information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 * */
router.get("/class/:id", isAuth, [
    param("id").isInt().withMessage("The id must be an int")
], controller.getClassById);

// Add new class data
/**
 *   post:
 *     summary: Add new class
 *     description: Add a new class to the system.
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       '201':
 *         description: Class added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 */
router.post("/class", isAuth, [
    body("_id").isInt().withMessage("The _id must be an int"),
    body("name").notEmpty().withMessage("Name is required"),
    body("supervisor").isInt().withMessage("Supervisor must be an int"),
    body("children").isArray().withMessage("Children must be an array")
], controller.addClass);

// Update class data
/**
 *   put:
 *     summary: Update class by ID
 *     description: Update class information by its ID.
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the class to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       '200':
 *         description: Class updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 * */
router.put("/class", isAuth, [
    body("_id").isInt().withMessage("The _id must be an int"),
    body("name").notEmpty().withMessage("Name is required"),
    body("supervisor").isInt().withMessage("Supervisor must be an int"),
    body("children").isArray().withMessage("Children must be an array")
], controller.updateClass);

// Delete specified class
/**
 * @swagger
 * /class/{id}:
 *   delete:
 *     summary: Delete specified class
 *     description: Delete a class by its ID.
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the class to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Class deleted successfully.
 *       '401':
 *         description: Unauthorized - User is not authenticated.
 *       '404':
 *         description: Class not found.
 *       '422':
 *         description: Validation error - ID must be an integer.
 */
router.delete("/class/:id", isAuth, [
    param("id").isInt().withMessage("The id must be an int")
], controller.deleteClass);

// Get class children info
/**
 * @swagger
 * /class/child/{id}:
 *   get:
 *     summary: Get class children info
 *     description: Retrieve information about children in a class.
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the class to retrieve children information.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Children information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Child'
 */
router.get("/class/child/:id", isAuth, [
    param("id").isInt().withMessage("The id must be an int")
], controller.getClassChildrenInfo);

// Get class supervisor info
/**
 * @swagger
 * /class/teacher/{id}:
 *   get:
 *     summary: Get class supervisor info
 *     description: Retrieve information about the supervisor of a class.
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the supervisor.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Supervisor information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 */
router.get("/class/teacher/:id", isAuth, [
    param("id").isInt().withMessage("The id must be an int")
], controller.getClassSupervisorInfo);

module.exports = router;
