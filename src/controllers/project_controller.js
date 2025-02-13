import ProjectModel from '../models/project_model.js'

export default class ProjectController {

  static async get(req, res) {
    try {
      return res.status(200).json(await ProjectModel.get());
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async search(req, res) {
    try {
      return res.status(200).json(
        await ProjectModel.search(req.params.name, req.query)
      );
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async totalCalculation(req, res) {
    try {
      return res.status(200).json(
        await ProjectModel.totalCalculation(req.params.id)
      );
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async create(req, res) {
    try {
      const data = req.body;
      Reflect.set(data, "creator", { user: req.session.user._id });

      return res.status(200).json(await ProjectModel.create(data));
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async delete(req, res) {
    try {
      const { ids } = req.params;

      return res.status(200).json(await ProjectModel.delete(ids.split(',')));
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}