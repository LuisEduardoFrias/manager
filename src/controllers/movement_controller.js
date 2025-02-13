import MovementModel from '../models/movement_model.js'

export default class MovementController {
  static async get(req, res) {
    try {
      const { id } = req.params;

      const proWithMov = await MovementModel.get(id);

      return res.status(200).json(proWithMov.movements);

    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async totalCalculation(req, res) {
    try {
      return res.status(200).json(
        await MovementModel.totalCalculation(req.params.id)
      );
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async create(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      Reflect.set(data, "creator", { user: req.session.user._id });

      return res.status(200).json(
        await MovementModel.create(id, data)
      );
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async delete(req, res) {
    try {
      const { ids } = req.params;

      return res.status(200).json(
        await MovementModel.delete(ids.split(','))
      );

    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}