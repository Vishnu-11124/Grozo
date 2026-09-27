import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { prisma } from "../config/prisma.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getFlashDeals = asyncHandler(
  async (req: Request, res: Response) => {
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

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const { category, search, minPrice, maxPrice, sort } = req.body;

  const filter: any = {};

  if (category && category !== "all") {
    filter.category = category;
  }

  if (search) {
    filter.name = {
      contains: search.trim(),
      mode: "insensitive",
    };
  }

  const min = minPrice ? Number(minPrice) : undefined;
  const max = maxPrice ? Number(maxPrice) : undefined;

  if (min !== undefined || max !== undefined) {
    filter.price = {};

    if (min !== undefined) {
      filter.price.gte = min;
    }

    if (max !== undefined) {
      filter.price.lte = max;
    }
  }

  let orderBy: any;

  if (sort === "price-low") {
    orderBy = { price: "asc" };
  } else if (sort === "price-high") {
    orderBy = { price: "desc" };
  } else {
    orderBy = { createdAt: "desc" };
  }

  const products = await prisma.product.findMany({
    where: filter,
    orderBy,
  });

  const productsWithDiscount = products.map((p) => {
    const discount =
      p.originalPrice && p.price
        ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
        : 0;

    return {
      ...p,
      discount,
    };
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        products: productsWithDiscount,
      },
      "Successfully fetched product details",
    ),
  );
});

export const getSingleProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      throw new ApiError(400, "Product id is required");
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    const discount =
      product.originalPrice && product.price
        ? Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) *
              100,
          )
        : 0;

    const productDetails = {
      ...product,
      discount,
    };

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { product: productDetails },
          "Successfully fetched product details",
        ),
      );
  },
);