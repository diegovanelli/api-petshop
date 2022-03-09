const TableModel = require('../routes/providers/TableModelProviders');

TableModel
    .sync()
    .then(() => console.log('Create table success'))
    .catch(console.log)