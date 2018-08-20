const Image = require('../models/image')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const uploadImage = function (req, res) {
    console.log("upload image");
    try {
        const token = req.headers.token
        let decoded = jwt.verify(token, process.env.JWT_KEY)
        Image.create({
            user: decoded.id,
            url: req.file.cloudStoragePublicUrl,
            emotion: emotion.emotion,
            numberFaces: emotion.numberFaces
        }, (err, result) => {
            if (err) {
                res.status(500)
                res.json({
                    error: 'error save image url to database'
                })
            } else {
                res.status(200)
                res.json({
                    message: "photo successfully saved to database",
                    data: result
                })
            }
        })
    } catch (err) {
        res.status(400)
            .json({
                message: "token invalid"
            })
    }
}

const deleteImage = function (req, res) {
    console.log("delete image");

    Image.remove({
        _id: req.params.id
    })
    .then(function () {
        res.status(200).json({
            message: 'delete image success'
        })
    })
    .catch(function (err) {
        res.status(500).json({
            message: 'delete image failed'
        })
    })
}
        

const getCurrentUserImage = (req, res) => {
    console.log("get current user image");
    try {
        const token = req.headers.token
        let decoded = jwt.verify(token, process.env.JWT_KEY)
        let query = {
            user: decoded.id
        }
        Image.find(query)
        .populate('user')
        .then(img => {
            res.status(200)
            res.json({
                message: "successfully get photos",
                data: img
            })
        })
        .catch(err => {
            res.status(500)
            res.json({
                error: 'error getting photos'
            })
        })
    } catch (err) {
    res.status(400)
        .json({
            message: "token invalid"
        })
    }
}

const getImageById = (req, res) => {
    console.log("get by image id");
    let query = {
        _id: req.params.id
    }
    Image.find(query)
    .populate('user')
    .then(img => {
        res.status(200)
        res.json({
            message: "successfully get photo",
            data: img
        })
    })
    .catch(err => {
        res.status(500)
        res.json({
            error: 'error getting photo'
        })
    })
}

const getImageByUserName = (req, res) => {
    console.log("get img by user name");
    let queryUser = {
        name: new RegExp(req.query.name, 'i')
    }
    User.findOne(queryUser)
    .then(user => {
        if (user) {
            let userId = user._id
            //find image with above user id
            let queryImg = {
                user: userId
            }
            Image.find(queryImg)
            .populate('user')
            .then(img => {
                res.status(200)
                res.json({
                    message: "successfully get photo",
                    data: img
                })
            })
            .catch(err => {
                res.status(500)
                res.json({
                    error: 'error getting photo'
                })
            })
    } else {
        res.status(401)
        res.json({
            error: 'user not found'
        })
        }
    })
    .catch(err => {
        res.status(500)
        res.json({
            error: 'error getting user'
        })
    })
}

const getAllUserImage = (req, res) => {
    console.log("get all user image");
    Image.find()
        .populate('user')
        .then(img => {
            res.status(200)
            res.json({
                message: "successfully get photos",
                data: img
            })
        })
        .catch(err => {
            res.status(500)
            res.json({
                error: 'error getting photo'
            })
        })
}


module.exports = {
    uploadImage,
    deleteImage,
    getCurrentUserImage,
    getImageById,
    getImageByUserName,
    getAllUserImage
}