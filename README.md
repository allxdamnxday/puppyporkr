# PuppyPorkr

A modern pet matchmaking platform built with React, TypeScript, Express, and Supabase.

## Features

- User authentication with JWT
- Pet profile creation and management
- Matchmaking system
- Real-time updates
- Modern UI with Tailwind CSS

## Tech Stack

- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL (via Supabase)
- ORM: Prisma

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/puppyporkr.git
cd puppyporkr
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
   - Create `.env` files in both frontend and backend directories
   - Copy the example environment variables from `.env.example` files
   - Add your Supabase credentials

4. Start the development servers:
```bash
# Start frontend (in frontend directory)
npm run dev

# Start backend (in backend directory)
npm run dev
```

## Development with Docker

You can also use Docker to run the development environment:

```bash
# Build and start all services
docker-compose up -d

# Stop all services
docker-compose down
```

## Production Deployment

This project is configured for deployment on Vercel. The frontend and backend are set up as separate projects.

### Frontend Deployment

The frontend is deployed to Vercel with the following configuration:

- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables:
  - `VITE_API_URL`: URL of the backend API
  - `VITE_SUPABASE_URL`: URL of your Supabase project

### Backend Deployment

The backend is deployed to Vercel with the following configuration:

- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables:
  - `NODE_ENV`: `production`
  - `DATABASE_URL`: Supabase PostgreSQL connection string
  - `JWT_SECRET`: Secret key for JWT token generation
  - `JWT_EXPIRES_IN`: JWT token expiration time
  - `JWT_REFRESH_SECRET`: Secret key for JWT refresh token generation
  - `JWT_REFRESH_EXPIRES_IN`: JWT refresh token expiration time

### CI/CD Pipeline

The project includes a GitHub Actions workflow that automatically builds and deploys the application to Vercel when changes are pushed to the main branch.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
