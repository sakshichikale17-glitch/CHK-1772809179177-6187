const express = require("express");
const router = express.Router();

router.post("/login", (req,res)=>{

    const {email,password,role} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"Email and password required"
        });
    }

    res.json({
        success:true,
        token:"demo_token_123",
        user:{
            name:"Parent User",
            email:email,
            role:role
        }
    });

});

module.exports = router;