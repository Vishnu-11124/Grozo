import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { prisma } from "../config/prisma.js";

export const getFlashDeals = asyncHandler(async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
        where: {stock : {gt: 0}},
        orderBy: {originalPrice: "desc"}
    })

    const productsWithDiscount = products.map((p:any) => {
        const discount = p.originalPrice && p.price ? Math.round((p.price)) : []
    })
})