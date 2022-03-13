class NoData extends Error {
    constructor() {
        super('No data provided to update!')
        this.name = 'NoData'
        this.idError = 1
        this.status = 400
    }
}

module.exports = NoData;