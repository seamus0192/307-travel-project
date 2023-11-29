import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function generateAccessToken(username: string) {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        }
        if (token) {
          resolve(token);
        }
      },
    );
  });
}

function authorizeRequest(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET!, (error, decoded) => {
      if (decoded) {
        next();
      } else {
        console.log("JWT error:", error);
        res.status(401).end();
      }
    });
  }
}

export { generateAccessToken, authorizeRequest };
