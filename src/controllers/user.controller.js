const express=require("express")
// const app = require("..")
const {body,validationResult}=require("express-validator")
const User=require("../models/user.model")

const router=express.Router()

router.get("/",async(req,res)=>{
    try {
        const user=await User.find().lean().exec()
        return res.status(200).send(user)
    } catch (error) {
      console.log(error)
    }
})


router.post(
  "/",
  body("firstName").trim().not().isEmpty(),
  
  body("lastName").trim().not().isEmpty(),
  
  body("email").trim().not().isEmpty().isEmail().
  custom(async(value)=>{
     const user=await User.findOne({firtsName:value})
     if(user)
     {
         throw new Error("email id is already exists")
     }
     return true
  }),

  body("pincode").trim().not().isEmpty().isNumeric().
  custom(async(val)=>{
      if(val.toString!=6)
      {
          throw new Error("pincode must be 6 digit number only")
      }
      return true
  }),

  body("age").trim().not().isEmpty().isNumeric().
  custom(async(value)=>{
      if(value<1||value>100)
      {
         throw new Error("age must be in between 1 to 100 only")
      }
      return true
  }),
  body("gender").not().isEmpty().
  custom(async(val)=>{
      let obj={
          Male:true,
          Female:true,
          female:true,
          male:true,
          Others:true,
          others:true
      }
      if(obj[val]!=true)
      {
          throw new Error("gender should be either Male, Female or Others");
      }
      return true 
  }),

  async (req, res) => {
    try {
      console.log("reqqqqqqq",req)
      console.log("bodyyyyy",body("firstName"))
      const errors=validationResult(req)
      console.log("errorssssss:",errors)
      if(!errors.isEmpty())
      {
          res.status(400).send({errors:errors.array()})
      }
        
      const user = await User.create(req.body);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);


module.exports=router