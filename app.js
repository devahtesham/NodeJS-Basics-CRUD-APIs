const express = require("express");  // import express
const mongoose = require("mongoose"); // import mongoose
const userModel = require("./models/userSchema");

const app = express() // initialize express
const PORT = process.env.PORT || 5000  // to start server we need a port

// MongoDB connectivity with NodeJS 
const BASE_URI = `mongodb+srv://devahtesham:devahtesham@cluster0.zwuva3q.mongodb.net/LearningDB`  // came from mongoDB when we connect from mongoDB compass
mongoose
    .connect(BASE_URI)
    .then((res) => console.log("MongoDB connect"))
    .catch((error) => console.log("error"))

// body parser
app.use(express.json()) // body parser, through this we can recieve our body on server, otherwise server will not display json data and it placed on the top of the api creation 

// ================ creating sample APIs =======================

// syntax:-  app.get("endpoint",callbackFn)
app.get("/api/sample",(request,response)=>{
    response.send("SAMPLE API HIT SUCCESSFULLY !")
})

app.get("/api/getname",(request,response)=>{
    response.send("AHTESHAM AKRAM ...")
})

app.post("/api/userinfo",(request,response)=>{
    const data = request.body
    // console.log("request ");
    // response.send("DATA CREATED SUCCESSFULLY !") // it works like return keyword in function, no code will be executed after this line
    // what we get in request from the frontend, we want to send back as a response back
    response.json({...data,"response":true}) // we have another method of response which is response.json() which take a json in an arguement  
})

// ========= creating API using RESTful API Rules (CRUD APIs) ==================

//GET
app.get("/api/user",(request,response,next) => {
// ============= model.find():- ================== 

    // const findQuery = {name:"Ahtesham"}  // when we want to search by name
    const findQuery = {isActive:true}       // when we want to search by isActive status
    // const findQuery = {}       // when we pass empty object in it, it returns all the data in array of object which is present in the Model

    // userModel.find(findQuery)
    //     .then((data) => {
    //         response.json({
    //             message:"user data",
    //             data
    //         })
    //     })
    //     .catch((err)=>{
    //         response.json({
    //             message:`error: ${err}`,
                
    //         })
    //     })

// ============= model.findOne():- ================== 

    // userModel.findOne(findQuery)
    //     .then((data) => {
    //         response.json({
    //             message:"user data",
    //             data
    //         })
    //     })
    //     .catch((err)=>{
    //         response.json({
    //             message:`error: ${err}`,
                
    //         })
    //     })
// ============= model.findById():- ================== 
    // findById() aapse id legaa jo frontend pr mere paas hogi laazmi tu ye us id se kisi specific data ko get krlegaa
    userModel.findById("6408b350bdeb2466921dbccc") // give id of one of the document from db which name is kamran 
        .then((data) => {
            response.json({
                message:"user data",
                data
            })
        })
        .catch((err)=>{
            response.json({
                message:`error: ${err}`,
                
            })
        })
    // response.send("get/fetch user ")
})

// ============ some other GET APIs =================
// GET (api for getting all users from db)
app.get("/api/allusers",(request,response) => {
    userModel.find({})
        .then((res)=>{
            response.json({
                message:"users get",
                res
            })
        })
        .catch((err)=>{
            response.json({
                message:`error: ${err}`,
            })

        })
})

// GET (get single user by id which is come from frontend, but a/cc to RESTapi rule, we dont pass body in get request, for this we use params)
app.get("/api/singleuser/:id",(request,response) => {
    // to get params we use this
    const {id} = request.params;

    // we can also use query param like this below, but for query parameter we will give key and variant with post request and make the above endpoint like this /api/singleuser
    // for query parameter our api is like on postmen /api/singleuser?id=1001
    // const id = request.query
    const _id = id
    // console.log("id",id);
    userModel.findById(_id)
        .then((res)=>{
            response.json({
                message:"users get",
                res
            })
        })
        .catch((err)=>{
            response.json({
                message:`error: ${err}`,
            })

        })
})

//POST
app.post("/api/user", (request, response, next) => {
  console.log("body", request.body);

// ============= model.create():- ================== 

    userModel.create(request.body)
        .then((data)=>{
            response.json({
                message:"user created Successfully !",
                data,
            })
        })
        .catch((err)=>{
            response.send("error",err)
        })
});

//PUT
app.put("/api/user",(request,response,next) => {
// ======================== model.findByIdAndUpdate() ================
    const {id, isActive} = request.body; // from frontend(postmen in our case)
    // userModel.findByIdAndUpdate(id,{isActive},{new:true})
    //     .then((res)=>{
    //         response.json({
    //             message:"user updated successfully !",
    //             res,
    //         })
    //     })
    //     .catch((err)=>{
    //         response.json({
    //             message:`error: ${err}`
    //         })
    //     })
    // response.send("update user")
})

//DELETE
app.delete("/api/user",(request,response,next) => {
    const {id} = request.body
    userModel.findByIdAndDelete(id)
        .then((res)=>{
            response.json({
                message:"user deleted successfully !",
                res,
            })
        })
        .catch((err)=>{
            response.json({
                message:`error: ${err}`
            })
        })
    // response.send("Delete user")
})


// for listen our server 
app.listen(PORT,() => console.log(`server is running on localhost: ${PORT}`)) // to listen/start server