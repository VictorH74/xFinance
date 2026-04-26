import { HttpResponseError } from "@/infra/http/interfaces/HttpResponseError";
import { verifyAccessToken } from "@/main/security/jwt";
import { NextFunction, Request, Response } from "express";

// TODO: check integrity
export const authValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.startsWith("Bearer ")
      ? authorization.slice(7)
      : undefined;

    if (!token) {
      throw new Error("missing access token");
    }

    const payload = verifyAccessToken(token);

    if (!payload) {
      throw new Error("invalid access token");
    }

    return next();
  } catch (error) {
    let error_description = "Unauthorized access";
    if (error instanceof Error) {
      error_description = error.message;
    } 

    const resObj: HttpResponseError = {
      error_code: 'Unauthorized',
      error_description,
    };

    return res.status(401).json(resObj);
  }
};
