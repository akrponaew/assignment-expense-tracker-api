var express = require('express')
var router = express.Router()
var Users = require('../models/users')

router.get('/:username/:password', async function (req, res, next) {
  const result = await Users.findOne({
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
    let createby = 'unknow'

    if (req.body.username) createby = req.body.username

    const user = new Users({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      lastname: req.body.lastname,
      status: 'A',
      createdate: new Date(),
      createby: createby
    })

    await user.save()
    res.send(user)
  }
});

router.put('/:username', async function (req, res, next) {
  try {
    const users = await Users.findOne({ username: req.params.username })

    if (req.body.password) users.password = req.body.password

    users.updatedate = new Date()

    users.updateby = req.params.username

    users.save()
    res.send(users)
  } catch (ex) {
    res.status(404)
    res.send({ error: `Update incompleted.` });
  }
});

module.exports = router;