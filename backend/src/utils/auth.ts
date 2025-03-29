import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

/**
 * Hash a password using bcrypt
 * @param password - The plain text password to hash
 * @returns The hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

/**
 * Compare a plain text password with a hashed password
 * @param password - The plain text password
 * @param hashedPassword - The hashed password to compare against
 * @returns True if the passwords match, false otherwise
 */
export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * Generate a JWT access token
 * @param userId - The user ID to include in the token payload
 * @returns The JWT access token
 */
export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, config.jwtSecret as jwt.Secret, {
    expiresIn: config.jwtExpiresIn,
  } as jwt.SignOptions);
};

/**
 * Generate a JWT refresh token
 * @param userId - The user ID to include in the token payload
 * @returns The JWT refresh token
 */
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, config.jwtRefreshSecret as jwt.Secret, {
    expiresIn: config.jwtRefreshExpiresIn,
  } as jwt.SignOptions);
};

/**
 * Verify a JWT access token
 * @param token - The JWT access token to verify
 * @returns The decoded token payload if valid
 * @throws Error if the token is invalid
 */
export const verifyAccessToken = (token: string): { userId: string } => {
  try {
    return jwt.verify(token, config.jwtSecret) as { userId: string };
  } catch (error) {
    throw new Error('Invalid access token');
  }
};

/**
 * Verify a JWT refresh token
 * @param token - The JWT refresh token to verify
 * @returns The decoded token payload if valid
 * @throws Error if the token is invalid
 */
export const verifyRefreshToken = (token: string): { userId: string } => {
  try {
    return jwt.verify(token, config.jwtRefreshSecret) as { userId: string };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};
