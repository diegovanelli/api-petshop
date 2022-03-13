class NotFound extends Error {
    constructor() {
        super('Provider not found!')
        this.name = 'NotFound'
        this.idError = 0
        this.status = 404
    }
}

module.exports = NotFound;