# Puppyporker

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
git clone https://github.com/yourusername/puppyporker.git
cd puppyporker
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

This project is configured for deployment on Vercel as a monorepo, with both frontend and backend in a single deployment.

### Monorepo Deployment

The project uses a root-level `vercel.json` file to configure the deployment of both frontend and backend:

- The backend is deployed as a serverless function
- The frontend is built as a static site
- API routes are configured to route to the backend
- Static assets and other routes are served from the frontend

### Environment Variables

The following environment variables are used in production:

- `NODE_ENV`: `production`
- `DATABASE_URL`: Supabase PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRES_IN`: JWT token expiration time
- `JWT_REFRESH_SECRET`: Secret key for JWT refresh token generation
- `JWT_REFRESH_EXPIRES_IN`: JWT refresh token expiration time
- `VITE_API_URL`: Set to `/api` for the frontend to access the backend API
- `VITE_SUPABASE_URL`: URL of your Supabase project

### Deployment Process

You can deploy the application to Vercel using the included deployment script:

```bash
# Make the script executable (if needed)
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

Alternatively, you can use the GitHub Actions workflow, which will automatically deploy the application when changes are pushed to the main branch.

### Custom Domain Setup

To use a custom domain with your Vercel deployment:

1. Add your domain in the Vercel dashboard
2. Configure your DNS settings on your domain provider (e.g., Hostinger)
3. Follow the instructions provided by Vercel to verify your domain

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
