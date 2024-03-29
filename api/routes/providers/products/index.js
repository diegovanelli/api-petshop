const router = require('express').Router({ mergeParams: true })
const { ProductSerializer } = require('../../../serializer.js')
const Product = require('./Product.js')
const Table = require('./ProductTable.js')

router = setOptionRouter(router, '/', 'GET, POST')

router.get('/' , async (req, res) => {
    const products = await Table.list(req.provider.id)
    const serializer = new ProductSerializer(
        res.getHeader('Content-Type')
    )
    res.send(
        serializer.serializer(products)
    )
})

router.post('/', async (req, res, next) => {
    try {
        const providerId = req.provider.id
        const body = req.body
        const data = Object.assign({}, body, { provider: providerId })
        const product = new Product(data)
        await product.create()
        const serializer = new ProductSerializer(
            res.getHeader('Content-Type')
        )
        createLastModifiedHead(product, res)
        res.set('Location', `/api/providers/${product.provider}/products/${product.id}`)
        res.status(201)
        res.send(
            serializer.serializer(product)
        )
    } catch (error) {
        next(error)
    }
})

router = setOptionRouter(router, '/:id', 'DELETE, GET, HEAD, PUT')

router.delete('/:id', async (req, res) => {
    const data = {
        id: req.params.id,
        provider: req.provider.id
    }

    const product = new Product(data)
    await product.delete()
    res.status(204)
    res.end()
})

router.get('/:id', async(req, res, next) => {
    try {
        const product = await loadProduct(req)
        const serializer = new ProductSerializer(
            res.getHeader('Content-Type'),
            ['price', 'stock', 'provider', 'createdAt', 'updatedAt']
        )
        createLastModifiedHead(product, res)
        res.send(
            serializer.serializer(product)
        )
    } catch (error) {
        next(error)
    }
})

router.head('/:id', async(req, res, next) => {
    try {
        const product = await loadProduct(req)
        createLastModifiedHead(product, res)
        res.status(200)
        res.end()
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const data = Object.assign(
            {},
            req.body,
            {
                id: req.params.id,
                provider: req.provider.id
            }
        )
        const product = new Product(data)
        await product.update()
        await product.load()
        createLastModifiedHead(product, res)
        res.status(204)
        res.end()
    } catch (error) {
        next(error)
    }
})

router = setOptionRouter(router, '/:id/decrease-stock', 'POST')

router.post('/:id/decrease-stock', async (req, res, next) => {
    try {
        const product = new Product({
            id: req.params.id,
            provider: req.provider.id
        })

        await product.load()
        product.stock = product.stock - req.body.quantity
        await product.decreaseStock()
        await product.load()
        createLastModifiedHead(product, res)
        res.status(204)
        res.end()
    } catch (error) {
        next(error)
    }
})

function createLastModifiedHead(product, res) {
    const timestamp = (new Date(product.createdAt).getTime())
    res.set('Last-Modified', timestamp)
}

async function loadProduct(req) {
    const data = {
        id: req.params.id,
        provider: req.provider.id
    }

    const product = new Product(data)
    await product.load()
    return product
}

module.exports = router