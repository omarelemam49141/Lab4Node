const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    _id: Number,
    name: String,
    supervisor: {type: Number, ref: "Teacher"},
    children: [{type:Number, ref: "Child"}]
})

module.exports = mongoose.model("class", schema)