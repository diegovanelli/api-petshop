class NotSupportValue extends Error {
    constructor(contentType) {
        super(`Not support this Content type: ${contentType}!`)
        this.name = 'NotSupportValue'
        this.idError = 3
        this.status = 406
    }
}

module.exports = NotSupportValue;