var express = require('express')
var router = express.Router()
var Expense = require('../models/expense')

router.get('/', async function (req, res, next) {
    var result = await Expense.find();
    res.json(result);
});

router.get('/:username', async function (req, res, next) {
    var result = await Expense.findOne({ createby: req.params.username })
    res.send(result)
});

router.post('/', async function (req, res, next) {
    const Expense = new Expense({
        description: req.body.description,
        amount: req.body.amount,
        month: req.body.month,
        year: req.body.year,
        expensedate: req.body.expensedate,
        createdate: new Date(),
        createby: req.body.name
    })

    await Expense.save()
    res.send(Expense)
});

router.put('/:empno', async function (req, res, next) {
    try {
        var Expense = await Expense.findOne({ empno: req.params.empno })

        if (req.body.empname) Expense.empname = req.body.empname

        if (req.body.emplastname) Expense.emplastname = req.body.emplastname

        Expense.updatedate = new Date()

        Expense.updateby = 'sa'

        Expense.save()
        res.send(Expense)
    } catch (ex) {
        res.status(404)
        res.send({ error: `Update incompleted.` });
    }
});

router.delete('/:empno', async function (req, res, next) {
    try {
        await Expense.deleteOne({ empno: req.params.empno })
        res.status(204).send()
    } catch (ex) {
        res.status(404)
        res.send({ error: `Delete incompleted.` })
    }
});

module.exports = router;