const express = require("express")
const cors = require("cors")
const { createTodo, updateTodo } = require("./types")
const { todo } = require("./db")
const app = express()

app.use(express.json())
app.use(cors())

app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload){
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    
    await todo.create({
        title: createPayload.title,
        description: createPayload.description
    })

    res.json({
        msg: "Todo added"
    })

})

app.get('/todos', async (req, res) => {
    const todos = await todo.find({});
    res.json({
        todos
    })
})

app.put('/completed', async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload){
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    
    await todo.update({
        _id: req.body.id
    }, {
        completed: true
    })

    req.json({
        msg: "Updated"
    })
})

app.listen(3000, () => console.log("Connected to port 3000")) 