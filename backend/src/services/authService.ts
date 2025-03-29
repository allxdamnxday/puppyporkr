import prisma from '../lib/prisma.js';
import { hashPassword, comparePasswords, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/auth.js';

/**
 * Register a new user
 * @param email - User's email
 * @param password - User's password
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns The created user (without password) and tokens
 */
export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  // Check if user with email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create the user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      // Create user preferences
      preferences: {
        create: {},
      },
      // Create pork points balance
      porkPointsBalance: {
        create: {},
      },
      // Create user statistics
      statistics: {
        create: {},
      },
    },
  });

  // Generate tokens
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Return user (without password) and tokens
  const { password: _, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

/**
 * Login a user
 * @param email - User's email
 * @param password - User's password
 * @returns The user (without password) and tokens
 */
export const login = async (email: string, password: string) => {
  // Find the user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if the password is correct
  const isPasswordValid = await comparePasswords(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Update last login time
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  // Generate tokens
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Return user (without password) and tokens
  const { password: _, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

/**
 * Refresh access token using refresh token
 * @param refreshToken - The refresh token
 * @returns New access token and refresh token
 */
export const refreshToken = async (token: string) => {
  try {
    // Verify the refresh token
    const decoded = verifyRefreshToken(token);

    // Find the user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Generate new tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

/**
 * Get user by ID
 * @param userId - The user ID
 * @returns The user (without password)
 */
export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Request password reset
 * @param email - User's email
 * @returns Success message
 */
export const requestPasswordReset = async (email: string) => {
  // Find the user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Generate a reset token
  const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  // Update the user with the reset token
  await prisma.user.update({
    where: { id: user.id },
    data: { resetPasswordToken: resetToken },
  });

  // In a real application, you would send an email with the reset link
  // For now, we'll just return the token for testing purposes
  return {
    message: 'Password reset email sent',
    resetToken, // Remove this in production
  };
};

/**
 * Reset password
 * @param resetToken - The reset token
 * @param newPassword - The new password
 * @returns Success message
 */
export const resetPassword = async (resetToken: string, newPassword: string) => {
  // Find the user by reset token
  const user = await prisma.user.findFirst({
    where: { resetPasswordToken: resetToken },
  });

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  // Hash the new password
  const hashedPassword = await hashPassword(newPassword);

  // Update the user with the new password and clear the reset token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
    },
  });

  return {
    message: 'Password reset successful',
  };
};
