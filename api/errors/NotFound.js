class NotFound extends Error {
    constructor(table) {
        super(`${table} not found!`)
        this.name = 'NotFound'
        this.idError = 0
        this.status = 404
    }
}

module.exports = NotFound;