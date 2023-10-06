const Joi = require("joi");

Joi.ValidationError.prototype.toJson = function () {
    let errors = this.details.map(detail => {
        return Object.assign({}, { message: detail.message, key: detail.context.key })
    })
    return errors
}

module.exports = Joi