import mongoose from 'mongoose'

import Movement from '../schemes/movements_scheme.js'
import Project from '../schemes/projects_scheme.js'
import { calculation } from '../helpers/calculation.js'

class MovementModel {
  async get(id) {
    return await Project.findById(id).populate('movements');
  }

  async create(id, data) {
    const movement = await Movement.create(data);

    const project = await Project.findById(id);
    project.movements.push(movement._id);

    await project.save();
    return movement;
  }

  async totalCalculation(id) {
    const movement = await Movement
      .findOne({ _id: new mongoose.Types.ObjectId(id) });

    return calculation(movement);
  }

  async delete(ids) {
    return await Movement.deleteMany({ _id: { $in: ids } });
  }
}

export default new MovementModel();