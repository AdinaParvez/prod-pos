const userModel = require('../models/userModel')

//login user
const loginController = async(req,res) =>{
      try{
          const {userId, password} = req.body
          const user = await userModel.findOne({userId, password, verified:true})
          if(user){
            res.status(200).send(user)
          }else{
            res.json({
              message: 'Login Failed',
              user,
            })
          }
          
      }catch(error){
        console.log(error)
        res.status(500).send('Internal Server Error'); // You might want to send an error response here

      }
}

//register user
const registerController = async(req, res) =>{
    try{
      const newUser = new userModel({...req.body, verified: true})
      await newUser.save()
      res.status(201).send('New user added successfully')
    }catch(error){
        res.status(400).send('Error in creating an item', error)
        console.log(error)
    }
}

module.exports = { loginController, registerController }