const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('../jwt')

//signin
router.get('/:username/:password', async function (req, res, next) {
  const result = await UsersModel.findOne({
    username: req.params.username
  })

  if (result) {
    const isUser = await bcrypt.compare(req.params.password, result.password)


    //if username and password correct
    if (isUser) {
      //create token for user
      const claims = {
        username: result.username,
        name: result.name,
        lastname: result.lastname
      }

      const token = jwt.encoded(claims)

      res.send(token)
    }
    else res.send(isUser)

  }
  else res.status(404).send('user not found')
});

//signup
router.post('/', async function (req, res, next) {
  const isExists = await UsersModel.findOne({ username: req.params.username })

  if (isExists) {
    res.status(404)
    res.send({ error: `Username already exists` });
  }
  else {
    let createby = 'unknow'

    if (req.body.username) createby = req.body.username

    const user = new UsersModel({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      lastname: req.body.lastname,
      status: 'A',
      createdate: new Date(),
      createby: createby
    })

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(user.password, salt)

    await user.save()
    res.status(201).send(user)
  }
});

//update or change password
// router.put('/:username', async function (req, res, next) {
//   try {
//     const user = await UsersModel.findOne({ username: req.params.username })

//     if (req.body.password) {
//       user.password = req.body.password

//       const salt = await bcrypt.genSalt(10)
//       user.password = await bcrypt.hash(user.password, salt)
//     }

//     user.updatedate = new Date()

//     user.updateby = req.params.username

//     user.save()
//     res.send(user)
//   } catch (ex) {
//     res.status(404)
//     res.send({ error: `Update incompleted.` });
//   }
// });

module.exports = router;