import LineModel from '../models/line_model.js'

export default class LineController {
  static async get(req, res) {
    try {
      const { id } = req.params;

      const movWithLine = await LineModel.get(id);

      return res.status(200).json(movWithLine.lines);

    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async totalCalculation(req, res) {
    try {
      return res.status(200).json(
        await LineModel.totalCalculation(req.params.id)
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
        await LineModel.create(id, data)
      );
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;

      return res.status(200).json(
        await LineModel.update(id, req.body)
      );
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async delete(req, res) {
    try {
      const { ids } = req.params;

      return res.status(200).json(await LineModel.delete(ids.split(',')));
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}