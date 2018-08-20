const User = require('../models/users')
const Item = require('../models/items')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const addItem = function(req,res){
    try {
        const token = req.headers.token
        let decoded = jwt.verify(token,process.env.JWT_KEY)
        let {name,img,description,category,priceTag,price,quantity}=req.body
        Item.create({
            name:name,
            img:img,
            description:description,
            category:category,
            price:price,
            quantity:quantity,
            userId:decoded.id
        })
        .then(function(newItem){
            res.status(200).json({msg:"new item added", item:newItem})
        })
        .catch(function(err){
            res.status(500).json({msg:"add item failed", erro:err})
        })
    } catch (error) {
        res.status(400).json({msg:"token invalid"})
    }
}

const deleteItem = function(req,res){
    try {
        const token = req.headers.token
        let decoded = jwt.verify(token, process.env.JWT_KEY)
        Item.remove({
            _id:req.params.id,
            userId:decoded.id
        })
        .then(function(deletedTask){
            if(deletedTask.n === 0){
                res.status(201).json({message:"no item found"})
            }else{
                res.status(200).json({message:"item delete success"})
            }
        })
        .catch(function(err){
            res.status(500).json({message:"error delete task", err:err})
        })
    } catch (error) {
        res.status(400).json({message:"token invalid"})
    }
}

const updateItem = function(req,res){
    try {
        const token = req.headers.token
        let decoded = jwt.verify(token, process.env.JWT_KEY)
        Item.update({
            _id:req.params.id,
            userId:decoded.id
        })
        .then(function(updatedTask){
            if(updatedTask.n === 0){
                res.status(201).json({message:"no item found"})
            }else{
                res.status(200).json({message:"update item success"})
            }
        })
        .catch(function(err){
            res.status(500).json({message:"update item failed",err:err})
        })
    } catch (error) {
        res.status(400).json({message:"token invalid"})
    }
}

const getAllItem = function(req,res){
    try {
        const token = req.headers.token
        let decoded = jwt.verify(token, process.env.JWT_KEY)
        Item.find({
            userId:decoded.id
        })
        .then(function(items){
            if(items){
                res.status(200).json({message:"items found", dataItems:items})
            }else{
                res.status(404).json({message:"items not found"})
            }
        })
        .catch(function(err){
            res.status(500).json({message:"error get items"})
        })
    } catch (error) {
        res.status(400).json({message:"token invalid"})
    }
}

const getOneItem = function(req,res){
    try {
        const token = req.headers.token
        let decoded = jwt.verify(token, process.env.JWT_KEY)
        Item.findOne({
            _id:req.params.id,
            userId:decoded.id
        })
        .then(function(item){
            if(item){
                res.status(200).json({message:"item found", dataItem:item})
            }else{
                res.status(404).json({message:"item not found"})
            }
        })
    } catch (error) {
        res.status(400).json({message:"token invalid"})
    }
}

const getItemByName = function(){
    try {
        const token = req.headers.token
        let decoded = jwt.verify(token, process.env.JWT_KEY)
        Item.find({
            userId:decoded.id,
            name:req.query.name
        })
        .then(function(itemsByName){
            res.status(200).json({message:"items by name found",dataItems:itemsByName})
        })
        .catch(function(err){
            res.status(404).json({message:"items not found"})
        })
    } catch (error) {
        res.status(400).json({message:"token invalid"})
    }
}



module.exports = {
    addItem,
    deleteItem,
    updateItem,
    getAllItem,
    getOneItem,
    getItemByName
}

