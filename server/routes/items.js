const express = require('express');
const router = express.Router();
const Item = require("../models/Item");

router.get('/', (req, res, next) => {
    Item.find()
        .then(apiResponse => {
            res.status(200).json(apiResponse);
        }).catch(apiError => {
            res.status(500).json(apiError);
        })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Item.findById(id)
        .then(apiResponse => {
            res.status(200).json(apiResponse);
        }).catch(apiError => {
            res.status(500).json(apiError);
        })
})

router.post('/', (req, res, next) => {

    if (!req.body) {
        res.status(400).send('Please retry')
    }

    const {
        name,
        description,
        image,
        category,
        quantity,
        address,
        location,
        id_user
    } = req.body;

    const newItem = {
        name,
        description,
        image,
        category,
        quantity,
        address,
        location,
        id_user
    };

    Item.create(newItem)
        .then(apiResponse => {
            res.status(201).json(apiResponse);
        })
        .catch(apiError => {
            res.status(500).json(apiError);
        })
});


module.exports = router;