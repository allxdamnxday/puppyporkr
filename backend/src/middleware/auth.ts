import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/auth.js';

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}

/**
 * Authentication middleware to verify JWT tokens
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    
    // Check if the authorization header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }
    
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];
    
    // Verify the token
    const decoded = verifyAccessToken(token);
    
    // Add the user ID to the request object
    req.user = {
      userId: decoded.userId,
    };
    
    // Call the next middleware
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

/**
 * Optional authentication middleware that doesn't require authentication
 * but will add user info to the request if a valid token is provided
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const optionalAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    
    // If no authorization header or it doesn't start with 'Bearer ', skip authentication
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }
    
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];
    
    // Verify the token
    const decoded = verifyAccessToken(token);
    
    // Add the user ID to the request object
    req.user = {
      userId: decoded.userId,
    };
    
    // Call the next middleware
    next();
  } catch (error) {
    // If token verification fails, continue without authentication
    next();
  }
};
