# Services

This directory contains service files that implement the business logic of the application.

Services are responsible for:
- Implementing business rules and logic
- Interacting with models/database
- Processing data before it's sent to controllers
- Handling complex operations that span multiple models

## Structure

Each service should focus on a specific domain or feature:

- `authService.ts` - Authentication and authorization logic
- `petService.ts` - Pet profile management logic
- `matchService.ts` - Matchmaking algorithm and match operations
- `porkPointsService.ts` - Virtual currency management
- `leaderboardService.ts` - Leaderboard calculations and achievement tracking
- `notificationService.ts` - Handling notifications and real-time updates
