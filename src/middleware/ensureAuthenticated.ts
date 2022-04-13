import { Response, Request, NextFunction, response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
  request: Request, 
  respone: Response, 
  next: NextFunction
){
  const authToken = request.headers.authorization;

  if(!authToken){
    return response.status(401).json({
      errorCode: "token invalid"
    })
  }

  const [, token] = authToken.split(" ");
  try{
    const { sub } = verify(token, process.env.JWT_SECRET);

    request.user_id = sub as string;
    
    return next();
  } catch(err){
    return response.status(401).json({errorCode: "token expirado"})
  }
}