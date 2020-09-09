const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')

module.exports = {
  async authenticate(req, res, next) {
    const { username, password } = req.body;

    try {
      if(username && password) {
        const token = jwt.sign({ username } , authConfig.secret, {
          expiresIn: 86400
        })
  
        return res.json({ username, token })
      } else {
        throw new Error('Falta usuário ou senha')
      }
    } catch (error) {
      next(error)
    }

    

  }
};
