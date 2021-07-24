const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
    logger.info("Hi")
    logger.error(error.message);
  
    if (error.name === "CastError") {
      return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    }else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    }
    next()
}

// TOKEN EXTRACTOR
const tokenExtractor = async (request, response, next) => {
  const authorization = request.get("authorization")

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const authorization = request.get("authorization")

  if(authorization && authorization.toLowerCase().startsWith("bearer ")){
      const decodedToken = jwt.verify(authorization.substring(7),process.env.SECRET)
      const user = await User.findById(decodedToken.id)
      user
      ? (request.user = user)
      : (request.user = null)
  }

  next();
}

module.exports = {
    errorHandler, tokenExtractor, userExtractor}