const express = require("express");
const app = express();
const mongoose=require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());

const mongoURL="mongodb+srv://alexvii:Sunking7@cluster0.hkc9298.mongodb.net/";

mongoose.connect(mongoURL, {
    useNewUrlParser:true,
})
.then(() =>{
    console.log("Connected to Database");
})
.catch((e) => console.log(e));



app.listen(5000,()=>{
    console.log("Server Started");
});

// app.post("/register", async(req,res)=>{
//     const{fname,lname,email,password}=req.body;
//     try {
        
//     } catch (error) {
        
//     }
// })


require("./userDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async(req,res)=>{
    const{fname,lname,email,password} = req.body;
    try {
        await User.create({
            fname,
            lname,
            email,
            password,
        })
        res.send({status:"Ok"})
    } catch (error) {
        req.send({status:"error"})
    }
})