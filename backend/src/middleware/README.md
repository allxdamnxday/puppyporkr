# Middleware

This directory contains middleware functions that process requests before they reach the route handlers.

Middleware are responsible for:
- Authentication and authorization checks
- Request validation
- Logging
- Error handling
- Rate limiting
- CORS configuration

## Structure

Each middleware should focus on a specific cross-cutting concern:

- `auth.ts` - JWT authentication middleware
- `validation.ts` - Request data validation middleware
- `errorHandler.ts` - Global error handling middleware
- `logger.ts` - Request logging middleware
- `rateLimiter.ts` - API rate limiting middleware
