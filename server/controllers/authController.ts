import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import isValidEmail from "../utils/validateEmail.js";
import { prisma } from "../config/prisma.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

const adminStatus = (email: string | null | undefined): boolean => {
  if (!email) return false;

  const adminEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",").map((e) =>
        e.trim().toLocaleLowerCase(),
      )
    : [];

  return adminEmails.includes(email.toLocaleLowerCase().trim());
};

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      throw new ApiError(400, "Please provide all fields");
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      throw new ApiError(400, "Invalid email format");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      throw new ApiError(400, "User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name,
      },
    });

    const token = generateToken(user.id);

    const { password: _, ...userData } = user;
    const userResponse = {
      ...userData,
      isAdmin: adminStatus(userData.email),
    };

    res.status(201).json(
      new ApiResponse(
        201,
        {
          user: userResponse,
          token,
        },
        "User successfully registered",
      ),
    );
  },
);
