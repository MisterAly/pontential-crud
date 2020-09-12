const db = require('../db');
const DevSchema = require("../models/Dev");

const devs = db.get("devs");

module.exports = {
  async show(req, res, next) {
    const {
      page,
      search = "",
      nome = "",
      sexo = "",
      hobby = "",
    } = req.query;

    const limit = 4;
    
    try {
      if (Object.keys(req.query).length !== 0) {
        const query = {$or:[
          {hobby: { $regex: `(?i)${search}` }},
          {nome: { $regex: `(?i)${search}` }},
          ],
          sexo: { $regex: `(?i)${sexo}` },
          hobby: { $regex: `(?i)${hobby}`},
          nome: { $regex: `(?i)${nome}` }
        };

        pageConfig = page ? {
          limit: limit,
          skip: (page - 1) * limit,
        } : {}

        const items = await devs.find(query, pageConfig);
        
        res.json({ items, page });
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
