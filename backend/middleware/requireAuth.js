const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated. Meaning TOKEN exists!!!
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization JWT required'})
  }

        //this splits off what we want from the header
  const token = authorization.split(' ')[1]

  try {

    console.log(`Look at me!\n I am the output from jwt.verify:\n`, jwt.verify(token, process.env.SECRET))

    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(`Middleware error!\n`, error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth