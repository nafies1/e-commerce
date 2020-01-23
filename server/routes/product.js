const router = require('express').Router()
const Product = require('../models/Product')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/', authentication, authorization,(req, res, next)=>{
    const {name, price, stock, description, featured_image} = req.body
    Product.create({
        name,
        price,
        stock,
        description,
        featured_image
    })
      .then(product=>{
          res.status(201).json(product)
      })
      .catch(err=>{
          next(err)
      })
})

router.get('/', (req, res, next)=>{
    Product.find()
      .then(products=>{
          res.status(200).json(products)
      })
      .catch(err=>{
          next(err)
      })
})

router.get('/:id', (req, res, next)=>{
    Product.findById(req.params.id)
      .then(products=>{
          res.status(200).json(products)
      })
      .catch(err=>{
          next(err)
      })
})

router.put('/:id', authentication, authorization,(req, res, next)=>{
    const {name, price, stock, description, featured_image} = req.body
    Product.findByIdAndUpdate(req.params.id, {
        name,
        price,
        stock,
        description,
        featured_image
    })
      .then(product=>{
          res.status(200).json({msg : `Product with id ${product._id} updated successfully`})
      })
      .catch(err=>{
          next(err)
      })
})

module.exports = router