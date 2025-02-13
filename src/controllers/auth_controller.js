import jwt from 'jsonwebtoken'

import AuthModel from '../models/auth_model.js'
import { encryptPassw, comparePassw } from '../helpers/encrypt.js'
import { SECRET_JWT_KEY } from '../helpers/config_consts.js'
import configCookies from '../helpers/config_cookies.js'

export default class AuthController {

  static async register(req, res) {
    try {
      const data = req.body;

      data.password = await encryptPassw(data.password.toString());

      return res.status(200).json(await AuthModel.create(data));
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async login(req, res) {
    try {
      const loginCredentials = req.body;

      const user = await AuthModel.getOne(loginCredentials.email);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (await comparePassw(user.password, loginCredentials.password.toString())) {
        const token = jwt.sign({ user }, SECRET_JWT_KEY, { expiresIn: '1h' });

        res.cookie('access_token', token, configCookies);

        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

}