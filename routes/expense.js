const express = require('express')
const router = express.Router()
const Expense = require('../models/expense')
const jwt = require('../jwt')

//shouldn't get all expense
// router.get('/', async function (req, res, next) {
//     const result = await Expense.find({});
//     res.send(result);
// });

router.get('/:username', jwt.isAuthenticated, async function (req, res, next) {
    const result = await Expense.findOne({ createby: req.params.username })
    res.send(result)
});

router.post('/', jwt.isAuthenticated, async function (req, res, next) {

    let createby = 'unknow'
    if (req.body.username) createby = req.body.username

    const expense = new Expense({
        description: req.body.description,
        amount: req.body.amount,
        month: req.body.month,
        year: req.body.year,
        expensedate: req.body.expensedate,
        createdate: new Date(),
        createby: createby
    })

    await expense.save()
    res.send(expense)
});

router.put('/:id', jwt.isAuthenticated, async function (req, res, next) {
    try {
        const expense = await Expense.findOne({ _id: req.params.id })

        if (req.body.description) expense.description = req.body.description

        if (req.body.amount) expense.amount = req.body.amount

        if (req.body.expensedate) expense.expensedate = req.body.expensedate

        expense.updatedate = new Date()

        if (req.body.username) expense.updateby = req.body.username
        else expense.updateby = 'unknow'

        expense.save()
        res.send(expense)
    } catch (ex) {
        res.status(404)
        res.send({ error: `Update incompleted.` });
    }
});

router.delete('/:id', jwt.isAuthenticated, async function (req, res, next) {
    try {
        await Expense.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch (ex) {
        res.status(404)
        res.send({ error: `Delete incompleted.` })
    }
});

module.exports = router;