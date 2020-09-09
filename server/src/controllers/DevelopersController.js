const monk = require("monk");

const DevSchema = require("../models/Dev");

const db = monk(process.env.MONGO_URI);
const devs = db.get("devs");

module.exports = {
  async show(req, res, next) {
    const {
      page = 1,
      nome = "",
      sexo = "",
      hobby = "",
    } = req.query;

    const limit = 5;

    try {
      if (Object.keys(req.query).length !== 0) {
        const query = {
          hobby: { $regex: `(?i)${hobby}` },
          nome: { $regex: `(?i)${nome}` },
          sexo: { $regex: `(?i)${sexo}` },
        };

        const items = await devs.find(query, {
          limit: limit,
          skip: (page - 1) * limit,
        });

        res.json({ items, page, limit });
      } else {
        const count = await devs.count();
        const items = await devs.find({});

        res.json({ items, total: count });
      }
    } catch (error) {
      next(error);
    }
  },

  async index(req, res, next) {
    try {
      const { id } = req.params;
      const item = await devs.findOne({
        _id: id,
      });
      if (!item) return next();
      return res.json(item);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const value = await DevSchema.validateAsync(req.body);
      const inserted = await devs.insert(value);

      res.json(inserted);
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await devs.remove({ _id: id });
      res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const value = await DevSchema.validateAsync(req.body);
      const item = await devs.findOne({
        _id: id,
      });
      if (!item) return next();
      await devs.update(
        {
          _id: id,
        },
        {
          $set: value,
        }
      );
      res.json(value);
    } catch (error) {
      next(error);
    }
  },
};
