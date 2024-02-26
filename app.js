const express = require("express");
const server = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const teachersRouters = require("./Routers/teachersRouter");
const body_parser = require("body-parser"); 
const childrenRouter = require("./Routers/childrenRouter");
const authenticationRouter = require("./Routers/authenticationRouter");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const swaggerSpec = require('./swaggerDef');
const swaggerUi = require('swagger-ui-express');
const classRouter = require("./Routers/classRouters");

//image variables
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "images"));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toLocaleDateString().replace(/\//g, "-") + "-" + file.originalname);
    }
})

let fileFilter = (req, file, cb) => {
    if(file.mimetype=="image/jpeg"
    || file.mimetype=="image.jpg"
    || file.mimetype=="image.png") 
        cb(null, true)
    else 
        cb(null, false)
}

server.use(morgan("dev"));

//connect to the database
mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("connected to the database");
        let port = process.env.PORT_NUMBER || 8080;
        server.listen(port, "localhost", ()=>{
            console.log("I'am listening on port " + port);
        })
    })
    .catch(err=>next(err))

//parsing
server.use(multer({storage}, {fileFilter}).single("image"));
server.use(body_parser.json());
server.use(body_parser.urlencoded({extended: false}));
//routers
//Swagger UI
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//AuthenticationRouters
server.use(authenticationRouter)
//teachers routers
server.use(teachersRouters);
//children routers
server.use(childrenRouter);
//class routers
server.use(classRouter);

//not found MW
server.use((req, res)=>{
    res.status(404).json({msg: "Not found!"})
})

//Error MW
server.use((error, req, res, next)=> {
    let errorStatus = error.status || 500;
    res.status(errorStatus).json({Error: error.message});
})