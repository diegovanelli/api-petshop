const router = require('express').Router({ mergeParams: true })
const Product = require('./Product.js')
const Table = require('./ProductTable.js')

router.get('/' , async (req, res) => {
    const products = await Table.list(req.provider.id)
    res.send(
        JSON.stringify(products)
    )
})

router.post('/', async (req, res, next) => {
    try {
        const providerId = req.provider.id
        const body = req.body
        const data = Object.assign({}, body, { provider: providerId })
        const product = new Product(data)
        await product.create()
        res.status(201)
        res.send(product)
    } catch (error) {
        next(error)
    }
})

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

module.exports = router