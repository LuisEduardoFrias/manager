import mongoose from 'mongoose'
import { schemeBaseStructure } from './scheme_base_structure.js'

const LinesSheme = new mongoose.Schema({
  ...schemeBaseStructure
})

export default mongoose.model('Lines', LinesSheme);