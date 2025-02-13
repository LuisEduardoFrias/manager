import mongoose from 'mongoose'

import Project from '../schemes/projects_scheme.js'
import { calculation } from '../helpers/calculation.js'

class ProjectModel {

  async get() {
    return await Project.find({});
  }

  async search(name, options) {
    const mergedOptions = { page: 1, limit: 10, ...options };
    const query = { name: { $regex: name, $options: 'i' } };

    return await Project.paginate(query, mergedOptions);
  }

  async create(data) {
    return await Project.create(data);
  }

  async totalCalculation(id) {
    const project = await Project
      .findOne({ _id: new mongoose.Types.ObjectId(id) });

    return calculation(project);
  }

  async delete(ids) {
    return await Project.deleteMany({ _id: { $in: ids } });
  }

}

export default new ProjectModel();