import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
const Schema = mongoose.Schema;

import { schemeBaseStructure } from './scheme_base_structure.js'

const ProjectsSheme = new mongoose.Schema({
  ...schemeBaseStructure,
  movements: [{ type: Schema.Types.ObjectId, ref: 'Movements', default: null }],
})

ProjectsSheme.plugin(paginate);

export default mongoose.model('Projects', ProjectsSheme);