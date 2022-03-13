class InvalidField extends Error {
    constructor(field) {
        super(`The field '${field}' is invalid!`)
        this.name = 'InvalidField'
        this.idError = 2
        this.status = 400
    }
}

module.exports = InvalidField;