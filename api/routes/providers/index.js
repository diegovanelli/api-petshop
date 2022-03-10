const router = require('express').Router();
const ProviderTable = require('./ProviderTable');
const Provider = require('./Provider');

router.get('/', async (_, res) => {
    const result = await ProviderTable.list();
    res.status(200);
    res.send(
        JSON.stringify(result)
    );
})

router.post('/', async (req, res) => {
    try {
        const returnData = req.body;
        const provider = new Provider(returnData);
        await provider.create();
        res.status(201);
        res.send(
            JSON.stringify(provider)
        );
    } catch(error) {
        res.status(400)
        res.send(
            JSON.stringify({
                message: error.message
            })
        );
    }
})

router.get('/:providerId', async (req, res) => {
    try {
        const id = req.params.providerId
        const provider = new Provider({ id: id });
        await provider.load();
        res.status(200);
        res.send(
            JSON.stringify(provider)
        );
    } catch (error) {
        res.status(404)
        res.send(
            JSON.stringify({
                message: error.message
            })
        );
    }
})

router.put('/:providerId', async (req, res) => {
    try {
        const id = req.params.providerId
        const returnData = req.body
        const data = Object.assign({}, returnData, { id: id});
        const provider = new Provider(data);
        await provider.update();
        res.status(204);
        res.end();
    } catch (error) {
        res.status(400);
        res.send(
            JSON.stringify({
                message: error.message
            })
        );
    }
})

router.delete('/:providerId', async (req, res) => {
    try {
        const id = req.params.providerId;
        const provider = new Provider({ id: id });
        await provider.load();
        provider.remover();
        res.status(204);
        res.end();
    } catch(error) {
        res.status(404);
        res.send(
            JSON.stringify({
                message: error.message
            })
        );
    }
})

module.exports = router;