const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{type: String, default: 'user'}
}, {
  timestamps: true
})


var User = mongoose.model('User', userSchema)

module.exports = User