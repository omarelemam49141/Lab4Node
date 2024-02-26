const jwt = require("jsonwebtoken");
const Teacher = require("../Models/teachersSchema");
const Child = require("../Models/childrenSchema");

exports.logIn = (req, res, next) => {
    let userFound = false;
    if(req.body.email == "admin@gmail.com" && req.body.password == "123456") {
        userFound = true;
        let token = jwt.sign({
            name: "admin",
            role: "admin"
        }, process.env.SECRET_KEY, {expiresIn: "1h"});
        res.status(201).json({token});
    }
    
    if(!userFound) {
        Teacher.findOne({email: req.body.email, password:req.body.password})
            .then(data=> {
                if(data) {
                    let token = jwt.sign({
                        name: data.name,
                        role: "teacher"
                    }, process.env.SECRET_KEY, {expiresIn: "1h"})
                    userFound=true;
                    res.status(201).json({token})
                }
            })
            .catch(err=>next(err));
    }
    
    if(!userFound) {
        Child.findOne({email: req.body.email, password: req.body.password})
                .then(data=>{
                    if(!data) throw new Error("The email or the password is not correct")
                    let token = jwt.sign({
                        name: data.name,
                        role: "child"
                    }, process.env.SECRET_KEY, {expiresIn:"1h"})
                    res.status(201).json({token})
                })
                .catch(err=>next(err))
    }
}