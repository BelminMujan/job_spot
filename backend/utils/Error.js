import Logger from "./log.js";
import log from "./log.js";

const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};

const logger = new Logger()
const isTrusted = (err) => {
    if (err instanceof AppError) {
        return err.isOperational;
    } else {
        return false;
    }
}
class AppError extends Error {
    constructor(name, statusCode, description, isOperational, errorStack) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errorStack = errorStack;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

}

const ErrorHandler = () => {
    process.on("unhandledRejection", (e) => {
        logger.error(e)
    })

    process.on("uncaughtException", (e) => {
        logger.error(e)
        if (e instanceof AppError) {
            if (!isTrusted(e)) {
                process.exit(1)
            }
        }
    })
}




export {
    AppError,
    STATUS_CODES,
    ErrorHandler
};
