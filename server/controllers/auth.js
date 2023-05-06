require('dotenv').config()

module.exports = {
    register: (req, res) => {
        console.log('Register')
    },
    login: (req, res) => {
        console.log('Login')
    }
}

