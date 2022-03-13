const NotSupportValue = require("./errors/NotFoundValue")
const jsontoxml = require('jsontoxml')

class Serializer {
    json(data) {
        return JSON.stringify(data)
    }

    xml(data) {
        let tag = this.tagSingular

        if (Array.isArray(data)) {
            tag = this.tagPlural
            data = data.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            })
        }

        return jsontoxml({ [tag]: data })
    }

    serializer(data) {
        data = this.filter(data)
        if (this.contentType === 'application/json') {
            return this.json(data)
        }

        if (this.contentType === 'application/xml') {
            return this.xml(data)
        }


        throw new NotSupportValue(this.contentType)
    }

    filterObjects(data) {
        const newObject = {}

        this.publicFields.forEach((field) => {
            if (data.hasOwnProperty(field)) {
                newObject[field] = data[field]
            }
        })

        return newObject
    }

    filter(data) {
        if (Array.isArray(data)) {
            data = data.map((item) => {
                return this.filterObjects(item)
            })
        } else {
            data = this.filterObjects(data)
        }

        return data
    }
}


class ProviderSerializer extends Serializer {
    constructor(contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = [
            'id',
            'company',
            'category'
        ].concat(extraFields || [])
        this.tagSingular = 'provider'
        this.tagPlural = 'providers'
    }
}

class ErrorSerializer extends Serializer {
    constructor(contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = [
            'id',
            'message'
        ].concat(extraFields || [])
        this.tagSingular = 'error'
        this.tagPlural = 'errors'
    }
}

module.exports = {
    Serializer: Serializer,
    ProviderSerializer: ProviderSerializer,
    ErrorSerializer: ErrorSerializer,
    acceptsFormats: ['application/json', 'application/xml']
}