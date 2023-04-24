const jwt = require('jsonwebtoken')
const userModels = require('../models/user.models')
const expressAsyncHandler = require('express-async-handler')

const protect = expressAsyncHandler(async(req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from postman
            token = req.headers.authorization.split(" ")[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWTTOKEN);

            req.user = await userModels.findById(decoded.id).select('-password')
            console.log(req.user)
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token) {
        res.status(401);
        throw new Error("Not Authorized, no token");
    }
});

module.exports = {protect}