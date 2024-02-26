const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    _id: Number,
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: String,
    age: Number,
    address: String,
    level: String
})

module.exports = mongoose.model("children", schema);