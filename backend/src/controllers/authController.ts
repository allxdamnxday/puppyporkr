import { Request, Response } from 'express';
import * as authService from '../services/authService.js';

/**
 * Register a new user
 * @route POST /api/auth/register
 * @param req - Express request object
 * @param res - Express response object
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, first name, and last name are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
    }

    // Register the user
    const result = await authService.register(email, password, firstName, lastName);

    // Return the user and tokens
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific errors
    if (error instanceof Error && error.message === 'User with this email already exists') {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }
    
    // Handle generic errors
    return res.status(500).json({
      success: false,
      message: 'An error occurred during registration',
    });
  }
};

/**
 * Login a user
 * @route POST /api/auth/login
 * @param req - Express request object
 * @param res - Express response object
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Login the user
    const result = await authService.login(email, password);

    // Return the user and tokens
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Login error:', error);
    
    // Handle specific errors
    if (error instanceof Error && error.message === 'Invalid email or password') {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
    
    // Handle generic errors
    return res.status(500).json({
      success: false,
      message: 'An error occurred during login',
    });
  }
};

/**
 * Refresh access token
 * @route POST /api/auth/refresh-token
 * @param req - Express request object
 * @param res - Express response object
 */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    // Validate required fields
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      });
    }

    // Refresh the token
    const result = await authService.refreshToken(refreshToken);

    // Return the new tokens
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    
    // Handle specific errors
    if (error instanceof Error && error.message === 'Invalid refresh token') {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
    
    // Handle generic errors
    return res.status(500).json({
      success: false,
      message: 'An error occurred during token refresh',
    });
  }
};

/**
 * Get current user
 * @route GET /api/auth/me
 * @param req - Express request object
 * @param res - Express response object
 */
export const getMe = async (req: Request, res: Response) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    // Get the user
    const user = await authService.getUserById(req.user.userId);

    // Return the user
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Get user error:', error);
    
    // Handle specific errors
    if (error instanceof Error && error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    
    // Handle generic errors
    return res.status(500).json({
      success: false,
      message: 'An error occurred while getting user information',
    });
  }
};

/**
 * Request password reset
 * @route POST /api/auth/reset-password-request
 * @param req - Express request object
 * @param res - Express response object
 */
export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    // Request password reset
    const result = await authService.requestPasswordReset(email);

    // Return success message
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    
    // Handle specific errors
    if (error instanceof Error && error.message === 'User not found') {
      // For security reasons, don't reveal that the user doesn't exist
      return res.status(200).json({
        success: true,
        message: 'If your email is registered, you will receive a password reset link',
      });
    }
    
    // Handle generic errors
    return res.status(500).json({
      success: false,
      message: 'An error occurred during password reset request',
    });
  }
};

/**
 * Reset password
 * @route POST /api/auth/reset-password
 * @param req - Express request object
 * @param res - Express response object
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Validate required fields
    if (!resetToken || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Reset token and new password are required',
      });
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
    }

    // Reset the password
    const result = await authService.resetPassword(resetToken, newPassword);

    // Return success message
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Password reset error:', error);
    
    // Handle specific errors
    if (error instanceof Error && error.message === 'Invalid or expired reset token') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    
    // Handle generic errors
    return res.status(500).json({
      success: false,
      message: 'An error occurred during password reset',
    });
  }
};
