const { verifyJwt } = require("../utils/generateJWT")
async function authMiddleware(req, res, next) {
    try {

        const token = req.headers.authorization

        if (!token) {
            return res.status(400).json({
                message: "Token required"
            })
        }

        if (!token.startsWith('Bearer ')) {
            return res.status(400).json({
                message: "Invalid token"
            })
        } 
        const checkVerify = token.split(' ')[1] 
        
        const verifyToken = await verifyJwt(checkVerify)

        if (!verifyToken) {
            return res.status(400).json({
                message: "Wrong token"
            })
        } else {
            next()
        } 

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
}

module.exports = { authMiddleware }