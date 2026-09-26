import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { prisma } from "../config/prisma.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getFlashDeals = asyncHandler(async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
      where: {
        stock: {
          gt: 0,
        },
      },
      orderBy: {
        originalPrice: "desc",
      },
    });

    const productsWithDiscount = products
      .map((p) => {
        const discount =
          p.originalPrice && p.price
            ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
            : 0;

        return {
          ...p,
          discount,
        };
      })
      .filter((p) => p.discount > 0)
      .slice(0, 8);

    res.status(200).json(
      new ApiResponse(
        200,
        {
          products: productsWithDiscount,
        },
        "Successfully fetched flash deal products",
      ),
    );
  },
);
