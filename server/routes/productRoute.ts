import express from 'express'
import { getFlashDeals, getProducts, getSingleProduct } from '../controllers/productController.js'

const productRouter = express.Router()

productRouter.get('/flash-deal-products', getFlashDeals)
productRouter.get('/', getProducts)
productRouter.get('/:id', getSingleProduct)

export default productRouter