const express = require('express')
const mongoose = require ('mongoose')
require('dotenv').config();


const cors =require('cors')

const app= express()
app.use(cors())

// const PORT = process.env.PORT || 8000
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;
app.use(express.json())
//db connection
mongoose.connect(MONGODB_URI).then(()=>{console.log("connected database")
    app.listen(PORT,()=>console.log("server is running"))

}).catch((err)=>console.log(err))


// USER SCHEMA
const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required :true
    },
    email :{
        type :String,
        required : true
    },
    password :{
        type : String,
        required : true
    },


},
{timestamps : true})


// Model Creation
const User = mongoose.model("User",userSchema)





// all routes

app.get("/", (req,res)=>{
    res.json({message :"server is running"})
})

// get one user route
app.get("/read/:id" ,async(req,res)=>{
    try {
        const id = req.params.id
        const user = await User.findById({_id:id})
        res.status(200).send(user)
        
    } catch (error) {
        res.status(500).send(error)
        
    }
})

// Get Users Route
app.get("/users", async (req, res) => {
    try {
        const users = await User.find() // Fetch all users from the database
        res.status(200).json(users) // Send a response with the list of users
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' }) // Send an error response
    }
})


// creating users route

app.post("/createuser", async(req,res,next)=>{
    try {
        const bodyData =req.body
        const user = new User(bodyData)
        const userData = await user.save()
        res.status(201).json(userData) 
        
    } catch (error) {
        res.status(500).send(error)
        
    }
})

// UPDATE USER ROUTE

app.put("/updateuser/:id", async(req,res)=>{
    try {
        const id = req.params.id
        const user = await User.findByIdAndUpdate({_id:id}, req.body, {new:true})
        res.status(201).send(user)
        
    } catch (error) {
        res.status(500).send(error)
        
    }
})


// deleting a user

app.delete("/delete/:id", async (req,res)=>{
    try {
        const id = req.params.id
        const user = await User.findByIdAndDelete({_id : id})
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

// ALL ROUTES
