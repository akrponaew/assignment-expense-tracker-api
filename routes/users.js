var express = require('express')
var router = express.Router()
var Users = require('../models/users')

router.get('/:username/:password', async function (req, res, next) {
  var result = await Users.findOne({
    username: req.params.username,
    password: req.params.password
  })

  res.send(result)
});

router.post('/', async function (req, res, next) {
  const isExists = await Users.findOne({ username: req.params.username })

  if (isExists) {
    res.status(404)
    res.send({ error: `Username already exists` });
  }
  else {
    const User = new Users({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      lastname: req.body.lastname,
      status: 'A',
      createdate: new Date(),
      createby: req.body.username
    })

    await User.save()
    res.send(User)
  }
});

router.put('/:username', async function (req, res, next) {
  try {
    var Users = await Users.findOne({ username: req.params.username })

    if (req.body.password) Users.password = req.body.password

    Users.updatedate = new Date()

    Users.updateby = req.params.username

    Users.save()
    res.send(Users)
  } catch (ex) {
    res.status(404)
    res.send({ error: `Update incompleted.` });
  }
});

module.exports = router;