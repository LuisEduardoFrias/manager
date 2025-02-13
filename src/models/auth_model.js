import Auth from '../schemes/users_scheme.js'

class AuthModel {
  constructor() {
  }

  async getOne(email) {
    return await Auth.findOne({ email });
  }

  async create(data) {
    return await Auth.create(data);
  }
}

export default new AuthModel();