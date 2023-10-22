import log from "../../utils/log.js"


const errorMiddleware = (err, req, res, next) => {
    log(err)
    res.status(err.statusCode).json(err)
    throw new AppError(err)

}

export default errorMiddleware