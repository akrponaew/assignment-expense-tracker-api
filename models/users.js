const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    description: String,
    amount: Number,
    month: String,
    year: Number
})

const UsersModel = mongoose.model('users', usersSchema)

module.exports = UsersModel