import express from 'express'
import { getFlashDeals, getProducts } from '../controllers/productController.js'

const productRouter = express.Router()

productRouter.get('/flash-deal-products', getFlashDeals)
productRouter.get('/', getProducts)

export default productRouter