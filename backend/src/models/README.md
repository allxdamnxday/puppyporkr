# Models

This directory contains model definitions that represent the database schema and data structures.

Models are responsible for:
- Defining the structure of database tables/collections
- Providing type definitions for TypeScript
- Implementing data validation rules

## Structure

Each model should represent a specific entity in the system:

- `User.ts` - User account information
- `Pet.ts` - Pet profile information
- `Match.ts` - Match relationships between pets
- `PorkPoint.ts` - Virtual currency transactions
- `Leaderboard.ts` - Leaderboard and achievement data

## ORM

This project uses [Prisma/TypeORM] as the ORM (Object-Relational Mapping) tool to interact with the PostgreSQL database.
