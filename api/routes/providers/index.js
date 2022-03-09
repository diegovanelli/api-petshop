const router = require('express').Router();
const ProviderTable = require('./ProviderTable');
const Provider = require('./Provider');

router.get('/', async (_, res) => {
    const result = await ProviderTable.list();
    res.send(
        JSON.stringify(result)
    );
})

router.post('/', async (req, res) => {
    const returnData = req.body
    const provider = new Provider(returnData)
    await provider.create()
    res.send(
        JSON.stringify(provider)
    )
})

router.get('/:providerId', async (req, res) => {
    try {
        const id = req.params.providerId
        const provider = new Provider({ id: id })
        await provider.load()
        res.send(
            JSON.stringify(provider)
        )
    } catch (error) {
        res.send(
            JSON.stringify({
                message: error.message
            })
        )
    }
})

router.put('/:providerId', async (req, res) => {
    try {
        const id = req.params.providerId
        const returnData = req.body
        const data = Object.assign({}, returnData, { id: id})
        const provider = new Provider(data)
        await provider.update()
        res.end()
    } catch (error) {
        res.send(
            JSON.stringify({
                message: error.message
            })
        )
    }
})

module.exports = router;