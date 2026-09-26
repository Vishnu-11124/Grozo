import express from 'express'
import { getFlashDeals } from '../controllers/productController.js'

const productRouter = express.Router()

productRouter.get('/flash-deal-products', getFlashDeals)

export default productRouter