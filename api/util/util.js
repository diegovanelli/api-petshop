function setOptionRouter(router, path, methods) {
    router.options(path, (_, res) => {
        res.set('Access-Control-Allow-Methods', methods)
        res.set('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204)
        res.end()
    })

    return router
}