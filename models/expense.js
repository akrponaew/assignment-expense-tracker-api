const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    description: String,
    amount: Number,
    month: String,
    year: Number,
    expensedate: Date,
    createdate: Date,
    createby: String,
    updatedate: Date,
    updateby: String
})

const ExpenseModel = mongoose.model('expense', expenseSchema)

module.exports = ExpenseModel