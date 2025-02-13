import mongoose from 'mongoose'
import { CONNECTION_STRING } from './config_consts.js'

class DbClient {
  constructor() {
    this.connect()
  }

  async connect() {
    await mongoose.connect(CONNECTION_STRING)
    console.log('connected db.')
  }

  async closeDb() {
    try {
      await mongoose.disconnect();
      console.log('closed db.')
    } catch (error) {
      console.log(error)
    }
  }
}

export default new DbClient();