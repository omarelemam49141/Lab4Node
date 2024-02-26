const Teacher = require("./../Models/teachersSchema");
const {validationResult} = require("express-validator");

exports.getAllTeachers = (req, res, next) => {
    if(req.role=="teacher" || req.role == "admin") {
        Teacher.find({})
            .then(data=>res.status(201).json(data))
            .catch(err=>next(err))
    } else {
        throw new Error("Not authorized");
    }
}

exports.insertTeacher = (req, res, next) => {
    if(req.role=="teacher" || req.role == "admin") {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((prev, curr)=>prev+=curr.msg + " ", "");
            throw error;
        }

        let object = new Teacher({
            _id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: req.file.image
        })

        object.save()
                .then(data=>res.status(201).json({msg: "Teacher added successfully", data}))
                .catch(err=>next(err))
    } else {
        throw new Error("Not authorized");
    }
}

exports.updateTeacher = (req, res, next) => {
    if(req.role=="teacher" || req.role == "admin") {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((prev, curr)=>prev+=curr.msg + " ", "");
            throw error;
        }

        Teacher.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(data=>{
            if(!data) throw new Error("Teacher not found")
            res.status(201).json({msg: "Teacher updated successfully", data})
        })
        .catch(err=>next(err))
    } else {
        throw new Error("Not authorized");
    }
}

exports.changePassword = (req, res, next) => {
    if(req.role=="teacher" || req.role == "admin") {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((prev, curr)=>prev+=curr.msg + " ", "");
            throw error;
        }

        Teacher.findByIdAndUpdate(req.params.id, {
            password: req.body.password
        })
        .then(data=> res.status(201).json({msg: "Password updated successfully", data}))
        .catch(err=>next(err))
    } else {
        throw new Error("Not authorized");
    }
}

exports.deleteTeacher = (req, res, next) => {
    if(req.role=="teacher" || req.role == "admin") {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((prev, curr)=>prev+=curr.msg + " ", "");
            throw error;
        }

        Teacher.findByIdAndDelete(req.body.id)
        .then(data=> res.status(201).json({msg: "Teacher deleted successfully", data}))
        .catch(err=>next(err))
    } else {
        throw new Error("Not authorized");
    }
}

exports.getTeacherByID = (req, res, next) => {
    let errors= validationResult(req);
    if(!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((prev, curr)=>prev+=curr.msg + " ", "");
        throw error;
    }

    Teacher.findOne({_id: req.params.id})
            .then(data=>{
                if(!data) throw new Error("Not found!");
                res.status(201).json({data})
            })
            .catch(err=>next(err))
}