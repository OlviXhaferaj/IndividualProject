const store = require('../models/store.models');

module.exports.findAllProducts = (req, res) => {
    store.find({})
    .then(findAllProducts => {
        console.log(findAllProducts);
        res.json(findAllProducts);
    })
    .catch(err => {
        console.log(err);
        res.json(err);
    })
}
module.exports.findOneProduct = (req, res) => {
    store.findOne({_id: req.params.id})
    .then(oneProduct => {
        console.log(oneProduct);
        res.json(oneProduct);
    })
    .catch(err => {
        console.log(err);
        res.json(err);
    })
}
module.exports.createProduct = (req, res) => {
    store.create(req.body)
    .then(product => {
        console.log(product);
        res.json(product);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
}
module.exports.updateProduct = (req, res) => {
    store.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
    .then(updatedProduct => {
        console.log(updatedProduct);
        res.json(updatedProduct);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
}
module.exports.deleteProduct = (req, res) => {
    store.findOneAndDelete({_id: req.params.id})
    .then(confirmDelete => {
        console.log(confirmDelete);
        res.json(confirmDelete);
    })
    .catch(err => {
        console.log(err);
        res.json(err);
    })
}
