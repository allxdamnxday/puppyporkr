# Controllers

This directory contains controller files that handle the request/response logic for the API endpoints.

Controllers are responsible for:
- Receiving requests from routes
- Interacting with services to process business logic
- Sending appropriate responses back to the client

## Structure

Each controller should focus on a specific resource or feature:

- `authController.ts` - Authentication-related controllers (login, register, etc.)
- `petController.ts` - Pet profile management
- `matchController.ts` - Match-related operations
- `porkPointsController.ts` - Virtual currency operations
- `leaderboardController.ts` - Leaderboard and achievement operations
