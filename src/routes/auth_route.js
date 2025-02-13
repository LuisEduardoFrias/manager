import express from 'express'
import AuthController from '../controllers/auth_controller.js'
import {validateLogin,validateRegister} from '../helpers/validations.js'

const routes = express.Router()

routes.post('/login', validateLogin, AuthController.login)
routes.post('/register',validateRegister, AuthController.register)

export default routes;