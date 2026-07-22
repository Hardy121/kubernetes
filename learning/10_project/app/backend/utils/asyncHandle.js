// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message || "server error"
//         })
//     }
// }

function asyncHandler(fun) {
    return async function () {
        try {
            await fun(req, res, next)
        } catch (error) {
            return res.status(error?.statusCode || 500).json({
                statusCode : error?.statusCode || 500,
                success : false,
                message : error?.message || "Internal server error"
            })
        }
    }
}

// const asyncHandler = (requestHandler) => {
//     (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next))
//             .catch((error) => next(error))
//     }
// }

module.exports = { asyncHandler }