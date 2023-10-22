
const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};

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

class InternalServerError extends AppError {
    constructor(name, description, errorStack) {
        super(name, STATUS_CODES.INTERNAL_ERROR, description, true, errorStack)
    }
}

class UnathorizedError extends AppError {
    constructor(name) {
        super(name, STATUS_CODES.UN_AUTHORISED, description, true, this.errorStack)
    }
}


export {
    AppError,
    InternalServerError,
    UnathorizedError,
    STATUS_CODES,
};
