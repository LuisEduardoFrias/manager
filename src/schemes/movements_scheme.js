import mongoose from 'mongoose'
import {schemeBaseStructure} from './scheme_base_structure.js'
const Schema = mongoose.Schema;

const MovementsSheme = new mongoose.Schema({
  ...schemeBaseStructure,
  lines: [{ type: Schema.Types.ObjectId, ref: 'Lines',default: null }],
})

export default mongoose.model('Movements', MovementsSheme);