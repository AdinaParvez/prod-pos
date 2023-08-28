const itemModel = require('../models/itemModel')

//get items
const getItemController = async(req,res) =>{
      try{
          const items = await itemModel.find()
          res.status(200).send(items)
      }catch(error){
        console.log(error)
        res.status(500).send('Internal Server Error'); // You might want to send an error response here

      }
}

//add items
const addItemController = async(req, res) =>{
    try{
      const newItem = new itemModel(req.body)
      await newItem.save()
      res.status(201).send('Item is created successfully')
    }catch(error){
        res.status(400).send('Error in creating an item', error)
        console.log(error)
    }
}

//edit items
const editItemController = async(req, res) => {
  try{
    const {itemId} = req.body
    console.log(itemId) 
    await itemModel.findOneAndUpdate({_id:itemId},req.body,{
      new:true
    })
    res.status(201).json('Item Updated!')
  }catch(error){
    res.status(400).send(error)
    console.log(error)
  }
}

//delete items
const deleteItemController = async(req, res) => {
  try{
    const {itemId} = req.body
    await itemModel.findOneAndDelete({_id:itemId})
    res.status(200).json('Item Deleted!')
  }catch(error){
    res.status(400).send(error)
    console.log(error)
  }
}

module.exports = { getItemController, addItemController, editItemController, deleteItemController }