import mongoose from 'mongoose'

import Line from '../schemes/lines_scheme.js'
import Movement from '../schemes/movements_scheme.js'
import Project from '../schemes/projects_scheme.js'
import { calculation } from '../helpers/calculation.js'

class LineModel {
  async get(id) {
    return await Movement.findById(id).populate('lines');
  }

  async create(id, data) {
    const line = await Line.create(data);

    const movement = await Movement.findById(id);
    movement.lines.push(line._id);

    await movement.save();

    return line;
  }

  async totalCalculation(id) {
    const line = await Line
      .findOne({ _id: new mongoose.Types.ObjectId(id) });

    return calculation(line);
  }

  async update(id, data) {
    const updatedLine = await this.#updateLineNumbers(id, data);

    const updatedMovement = await this.#updateMovementNumbers(updatedLine);

    const updatedProject = await this.#updateProjectNumbers(updatedMovement);

    return {
      updatedLine,
      updatedMovement,
      updatedProject
    }
  }

  async delete(ids) {
    return await Line.deleteMany({ _id: { $in: ids } });
  }

  #updateNumbers(data, obj) {
    try {
      const { sumPrice, sumBudget } = data;

      if (!!sumPrice) {
        const lastNumber = obj.numbers['sumPrice'].number;
        obj.numbers['sumPrice'].lastNumber = lastNumber;
        obj.numbers['sumPrice'].number = sumPrice;

        const lastValue = obj.numbers['sumPrice'].value;
        obj.numbers['sumPrice'].lastValue = this.#formatCurrency(lastValue);
        obj.numbers['sumPrice'].value = this.#formatCurrency(sumPrice);
      }

      if (!!sumBudget) {
        const lastNumber = obj.numbers['sumBudget'].number;
        obj.numbers['sumBudget'].lastNumber = lastNumber;
        obj.numbers['sumBudget'].number = sumBudget;

        const lastValue = obj.numbers['sumBudget'].value;
        obj.numbers['sumBudget'].lastValue = this.#formatCurrency(lastValue);
        obj.numbers['sumBudget'].value = this.#formatCurrency(sumBudget,);
      }

      const budgetUtility = sumBudget - sumPrice;
      obj.numbers.budgetUtility.number = budgetUtility;
      obj.numbers.budgetUtility.value = this.#formatCurrency(budgetUtility);
      const budgetMargin = sumBudget === 0 ? 0 : (budgetUtility / sumBudget) * 100;
      obj.numbers.budgetMargin.number = budgetMargin;
      obj.numbers.budgetMargin.value = `${budgetMargin.toFixed(2)} %`;
    } catch (error) {
      throw error;
    }
  }

  async #updateLineNumbers(lineId, data) {
    const line = await Line.findOne({ _id: new mongoose.Types.ObjectId(lineId) });

    if (!line) {
      throw new Error('Line not found');
    }

    this.#updateNumbers(data, line)

    await line.save();

    return line;
  }

  async #updateMovementNumbers(updatedLine) {
    const movement = await Movement.findOne({ lines: updatedLine._id });

    if (!movement) {
      return;
    }

    const data = {
      sumPrice: updatedLine.numbers.sumPrice.number,
      sumBudget: updatedLine.numbers.sumBudget.number
    };

    this.#updateNumbers(data, movement)

    await movement.save();
    return movement;
  }

  async #updateProjectNumbers(updateMovement) {
    const project = await Project.findOne({ movements: updateMovement._id });
    if (!project) {
      return;
    }

    const data = {
      sumPrice: updateMovement.numbers.sumPrice.number,
      sumBudget: updateMovement.numbers.sumBudget.number
    };

    this.#updateNumbers(data, project);

    await project.save();
    return project;
  }

  #formatCurrency(number) {
    return `DOP $${number}`;
  }
}

export default new LineModel();