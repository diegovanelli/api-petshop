const { ProviderSerializer } = require('../../serializer')
const ProviderTable = require('./ProviderTable')

const router = require('express').Router()

router = setOptionRouter(router, '/', 'GET')

router.get('/', async (req, res) => {
    const results = await ProviderTable.list()
    res.status(200)
    const serializer = new ProviderSerializer(
        res.getHeader('Content-Type')
    )
    res.send(
        serializer.serializer(results)
    )
})

module.exports = router