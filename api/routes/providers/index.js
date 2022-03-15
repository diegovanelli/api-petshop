const router = require('express').Router();
const ProviderTable = require('./ProviderTable');
const Provider = require('./Provider');
const { ProviderSerializer } = require('../../serializer');

router = setOptionRouter(router, '/', 'GET, POST')

router.get('/', async (_, res) => {
    const result = await ProviderTable.list();
    res.status(200);
    const serializer = new ProviderSerializer (
        res.getHeader('Content-Type')
    )
    res.send(
        serializer.serializer(result)
    );
})

router.post('/', async (req, res, next) => {
    try {
        const returnData = req.body;
        const provider = new Provider(returnData);
        await provider.create();
        res.status(201);
        const serializer = new ProviderSerializer (
            res.getHeader('Content-Type')
        )
        res.send(
            serializer.serializer(provider)
        );
    } catch(error) {
        next(error)
    }
})

router = setOptionRouter(router, '/:providerId', 'GET, POST, DELETE')

router.get('/:providerId', async (req, res, next) => {
    try {
        const id = req.params.providerId
        const provider = new Provider({ id: id });
        await provider.load();
        res.status(200);
        const serializer = new ProviderSerializer (
            res.getHeader('Content-Type'),
            ['email', 'createdAt', 'updatedAt']
        )
        res.send(
            serializer.serializer(provider)
        );
    } catch (error) {
        next(error)
    }
})

router.put('/:providerId', async (req, res, next) => {
    try {
        const id = req.params.providerId
        const returnData = req.body
        const data = Object.assign({}, returnData, { id: id});
        const provider = new Provider(data);
        await provider.update();
        res.status(204);
        res.end();
    } catch (error) {
        next(error)
    }
})

router.delete('/:providerId', async (req, res, next) => {
    try {
        const id = req.params.providerId;
        const provider = new Provider({ id: id });
        await provider.load();
        provider.remover();
        res.status(204);
        res.end();
    } catch(error) {
        next(error)
    }
})

const productsRouter = require('./products')

const verifyProvider = async (req, res, next) => {
    try {
        const id = req.params.providerId
        const provider = new Provider({ id: id })
        await provider.load()
        req.provider = provider
        next()
    } catch (error) {
        next(error)
    }
}

router.use('/:providerId/products', verifyProvider, productsRouter)

module.exports = router;