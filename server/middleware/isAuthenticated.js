// load the .env file containing environment variables into the node.js process
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        // get value of authorization header from HTTP request and check if it exists
        const headerToken = req.get('Authorization')
        
        // if it doesn't exist send 401 error
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token
        
        // verify the JWT using the .verify method from the jasonwebtoken package
        try {
            token = jwt.verify(headerToken, SECRET)
        }
        catch (err) {
            err.statusCode = 500
            throw err
        }
        // check whether the token variable exists. If not, throw error 401. Else call next function
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}
