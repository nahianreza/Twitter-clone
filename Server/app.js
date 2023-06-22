const express = require("express");
const app = express();
const mongoose=require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "kjsen12iu3hkwjdwjqen23u18932791njsajndasjdn[]asdasdfqw"

const mongoURL="mongodb+srv://alexvii:Sunking7@cluster0.hkc9298.mongodb.net/";

mongoose.connect(mongoURL, {
    useNewUrlParser:true,
})
.then(() =>{
    console.log("Connected to Database");
})
.catch((e) => console.log(e));

require("./userDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async(req,res)=>{
    const{fname,lname,email,password} = req.body;

    const encryptedPassword = await bcrypt.hash(password,10);
    try {
        const oldUser = await User.findOne({email});

        if (oldUser){
            return  res.send({status:"error",message:"User Already Exists"})
        }
        await User.create({
            fname,
            lname,
            email,
            password:encryptedPassword,
        })
        res.send({status:"Ok"})
    } catch (error) {
        req.send({status:"error"})
    }
});

app.post("/login-user", async(req,res)=>{
    const{email,password} = req.body;

    const user = await User.findOne({email});
    if (!user){
        return res.json({status: "error", error:"User Not Found"});
    }
    if (await bcrypt.compare(password,user.password)){
        const token = jwt.sign(
            { email: user.email },
            JWT_SECRET
        );

        return res.json({
            status:"ok",
            data: token
        });
    }
    res.json({status: "error", error:"Invalid Credentials"});
});

app.post("/userData",async(req,res)=>{
    const {token} = req.body;
    try{
        const user = jwt.verify(token,JWT_SECRET);
        const useremail = user.email;
        User.findOne({email:useremail})
            .then((data)=>{
                res.send({status:"ok",data:data});
            })
            .catch((error)=>{
            res.send({status:"error", data: error });
            });
        } catch(error){}
});


app.listen(5000,()=>{
    console.log("Server Started");
});
