const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/tododb")

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: {
        type: Boolean,
        default: false
    }
})

const todo = mongoose.model("Todo", todoSchema)

module.exports = {
    todo
}