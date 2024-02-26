const Child = require("./../Models/childrenSchema");
const {validationResult} = require("express-validator");

exports.GetAllChildren = (req, res, next) => {
    if(req.role == "child" || req.role == "admin") {
        Child.find({})
            .then(data=>res.status(201).json(data))
            .catch(err=>next(err))
    } else {
        throw new Error("Not authorized");
    }
}

exports.insertChild = (req, res, next) => {
    if(req.role == "child" || req.role == "admin") {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((prev, curr)=>prev+=curr.msg + " ", "");
            throw error;
        }

        let object = new Child({
            _id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: req.file.filename,
            age: req.body.age,
            address: req.body.address,
            level: req.body.level
        })

        object.save()
                .then(data=>res.status(201).json({msg: "Child added successfully", data}))
                .catch(err=>next(err))
    } else {
        let err = new Error()
        err.status=402;
        err.message="Not authorized"
        throw err;
    }
}

exports.updateChild = (req, res, next) => {
    if(req.role == "child" || req.role == "admin") {
        let errors = validationResult(req);
    if(!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((prev, curr)=>prev+=curr.msg + " ", "");
        throw error;
    }

    Child.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.file.filename,
        age: req.body.age,
        address: req.body.address,
        level: req.body.level
    })
    .then(data=>{
        if(!data) throw new Error("Child not found")
        res.status(201).json({msg: "Child updated successfully", data})
    })
    .catch(err=>next(err))
    } else {
        let err = new Error()
        err.status=402;
        err.message="Not authorized"
        throw err;
    }
}

exports.changePassword = (req, res, next) => {
    if(req.role == "child" || req.role == "admin") {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((prev, curr)=>prev+=curr.msg + " ", "");
            throw error;
        }

        Child.findByIdAndUpdate(req.params.id, {
            password: req.body.password
        })
        .then(data=> res.status(201).json({msg: "Password updated successfully", data}))
        .catch(err=>next(err))
    } else {
        let err = new Error()
        err.status=402;
        err.message="Not authorized"
        throw err;
    }
}

exports.deleteChild = (req, res, next) => {
    if(req.role == "child" || req.role == "admin") {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((prev, curr)=>prev+=curr.msg + " ", "");
            throw error;
        }

        Child.findByIdAndDelete(req.body.id)
        .then(data=> res.status(201).json({msg: "Child deleted successfully", data}))
        .catch(err=>next(err))
    } else {
        let err = new Error()
        err.status=402;
        err.message="Not authorized"
        throw err;
    }
}

exports.getChildByID = (req, res, next) => {
    let errors= validationResult(req);
    if(!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((prev, curr)=>prev+=curr.msg + " ", "");
        throw error;
    }

    Child.findOne({_id: req.params.id})
            .then(data=>{
                if(!data) throw new Error("Not found!");
                res.status(201).json({data})
            })
            .catch(err=>next(err))
}