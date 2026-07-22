const jwt = require('jsonwebtoken')

async function generateJwt(payload) {
    try {
        const token = await jwt.sign(payload, "JwtTokenRevisionAgain", { algorithm: "HS512" })
        return token
    } catch (error) {
        return false
    }
}

async function verifyJwt(token) {
    try {
        const isValid = await jwt.verify(token, "JwtTokenRevisionAgain")
        return isValid
    } catch (error) {
        return false
    }
}
async function decodeJwt(token) {
    try {
        const decodeJwt = await jwt.decode(token)
        return decodeJwt

    } catch (error) {
        console.log(error?.message)
    }
}

module.exports = { generateJwt, verifyJwt, decodeJwt }