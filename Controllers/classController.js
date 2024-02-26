const Class = require("./../Models/classSchema");
const { validationResult } = require("express-validator");

exports.getAllClasses = (req, res, next) => {
    Class.find()
        .then(classes => res.status(200).json(classes))
        .catch(err => next(err));
};

exports.getClassById = (req, res, next) => {
    const classId = req.params.id;
    Class.findById(classId)
        .then(clazz => {
            if (!clazz) {
                const error = new Error("Class not found");
                error.status = 404;
                throw error;
            }
            res.status(200).json(clazz);
        })
        .catch(err => next(err));
};

exports.addClass = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.status = 422;
        return next(error);
    }

    const { _id, name, supervisor, children } = req.body;

    const newClass = new Class({
        _id,
        name,
        supervisor,
        children
    });

    newClass.save()
        .then(savedClass => res.status(201).json(savedClass))
        .catch(err => next(err));
};

exports.updateClass = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.status = 422;
        return next(error);
    }

    const { _id, name, supervisor, children } = req.body;

    Class.findByIdAndUpdate(_id, { name, supervisor, children }, { new: true })
        .then(updatedClass => {
            if (!updatedClass) {
                const error = new Error("Class not found");
                error.status = 404;
                throw error;
            }
            res.status(200).json(updatedClass);
        })
        .catch(err => next(err));
};

exports.deleteClass = (req, res, next) => {
    const classId = req.params.id;
    Class.findByIdAndDelete(classId)
        .then(deletedClass => {
            if (!deletedClass) {
                const error = new Error("Class not found");
                error.status = 404;
                throw error;
            }
            res.status(200).json({ message: "Class deleted successfully", deletedClass });
        })
        .catch(err => next(err));
};

exports.getClassChildrenInfo = (req, res, next) => {
    const classId = req.params.id;
    Class.findById(classId)
        .populate("children")
        .then(clazz => {
            if (!clazz) {
                const error = new Error("Class not found");
                error.status = 404;
                throw error;
            }
            res.status(200).json(clazz.children);
        })
        .catch(err => next(err));
};

exports.getClassSupervisorInfo = (req, res, next) => {
    const teacherId = req.params.id;
    Class.find({ supervisor: teacherId })
        .then(classes => {
            if (!classes.length) {
                const error = new Error("No classes found for this supervisor");
                error.status = 404;
                throw error;
            }
            res.status(200).json(classes);
        })
        .catch(err => next(err));
};
