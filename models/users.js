const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    username: String,
    password: String,
    name: String,
    lastname: String,
    status: String,
    createdate: Date,
    createby: String,
    updatedate: Date,
    updateby: String

})

const UsersModel = mongoose.model('users', usersSchema)

module.exports = UsersModel