var express = require('express')
var router = express.Router()
var Users = require('../models/users')

router.get('/', async function (req, res, next) {
  var result = await Users.find();
  res.json(result);
});

router.get('/:empno', async function (req, res, next) {
  var result = await Users.findOne({ empno: req.params.empno })
  res.send(result)
});

router.post('/', async function (req, res, next) {
  const Users = new Users({
    empno: req.body.empno,
    empname: req.body.empname,
    emplastname: req.body.emplastname,
    createdate: new Date(),
    createby: 'sa'
  })

  await Users.save()
  res.send(Users)
});

router.put('/:empno', async function (req, res, next) {
  try {
    var Users = await Users.findOne({ empno: req.params.empno })

    if (req.body.empname) Users.empname = req.body.empname

    if (req.body.emplastname) Users.emplastname = req.body.emplastname

    Users.updatedate = new Date()

    Users.updateby = 'sa'

    Users.save()
    res.send(Users)
  } catch (ex) {
    res.status(404)
    res.send({ error: `Update incompleted.` });
  }
});

router.delete('/:empno', async function (req, res, next) {
  try {
    await Users.deleteOne({ empno: req.params.empno })
    res.status(204).send()
  } catch (ex) {
    res.status(404)
    res.send({ error: `Delete incompleted.` })
  }
});

module.exports = router;