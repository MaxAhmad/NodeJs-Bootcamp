const express = require('express')
const userController = require('./../controllers/userController');



/**IMPLEMENTING USERS ROUTE */

const userRouter = express.Router()

userRouter.route('/').get(userController.getAllUsers).post(userController.createUser)
userRouter.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser)

module.exports = userRouter