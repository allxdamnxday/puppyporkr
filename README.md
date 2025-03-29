# PuppyPorkr

A modern pet matchmaking platform built with React, TypeScript, and Supabase.

## Features

- User authentication with Supabase
- Pet profile creation and management
- Matchmaking system
- Real-time updates
- Modern UI with Tailwind CSS

## Tech Stack

- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS
- Backend: Supabase
- Database: PostgreSQL (via Supabase)

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

## Deployment

This project is configured for deployment on Vercel. The frontend and backend are set up as separate projects.

### Frontend Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel's project settings
4. Deploy!

### Backend Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel's project settings
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 