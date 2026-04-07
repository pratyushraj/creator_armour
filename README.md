# Creator Armour

A full-stack web application where Instagram creators and brands collaborate through structured offers instead of messy DMs.

## Features

- **Creator Onboarding**: Sign up and get a professional collab link in under 60 seconds
- **Public Collab Page**: Brands can view creator packages and send structured offers
- **Offer System**: Structured offers with deliverables, budget, and deadlines
- **Deal Management**: Visual timeline tracking from offer to payment
- **Content Flow**: Submit Instagram links and manage revisions
- **Payment Tracking**: Mark payments as sent and confirmed

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand (state management)
- Lucide React (icons)
- Radix UI components

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL (via Supabase)
- JWT authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Supabase account)

### Installation

1. Clone the repository:
```bash
cd creator-armour
```

2. Set up the frontend:
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm run dev
```

3. Set up the backend:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database URL
npm run dev
```

### Environment Variables

#### Frontend (.env)
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:4000/api
```

#### Backend (.env)
```
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

### Database Setup

The backend will automatically create tables on first run. Alternatively, you can run the SQL in `backend/src/db.ts` manually.

## Project Structure

```
creator-armour/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── lib/            # Utilities and API client
│   │   ├── store/          # Zustand store
│   │   ├── types/          # TypeScript types
│   │   └── hooks/          # Custom hooks
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── db.ts           # Database connection & schema
│   │   └── server.ts       # Express server entry
│   └── package.json
└── README.md
```

## API Endpoints

### Auth
- `POST /api/auth/signup` - Create creator account
- `POST /api/auth/login` - Log in
- `GET /api/auth/me` - Get current user

### Creators
- `GET /api/creators/:handle` - Get public creator profile
- `GET /api/creators/:handle/packages` - Get creator packages

### Deals
- `GET /api/deals` - Get all deals (authenticated)
- `GET /api/deals/:id` - Get deal details
- `PATCH /api/deals/:id` - Update deal
- `DELETE /api/deals/:id` - Cancel deal

### Offers
- `POST /api/offers` - Create new offer (brand)
- `POST /api/offers/:id/accept` - Accept offer
- `POST /api/offers/:id/decline` - Decline offer

### Packages
- `GET /api/packages` - Get creator packages (authenticated)
- `POST /api/packages` - Create package (authenticated)
- `DELETE /api/packages/:id` - Delete package (authenticated)

## Deal Lifecycle

1. **New Offer** - Brand submits offer
2. **Accepted** - Creator accepts the offer
3. **Content Creation** - Creator makes content
4. **Content Submitted** - Creator shares Instagram link
5. **Brand Review** - Brand reviews content
6. **Approved** - Brand approves (or changes requested)
7. **Payment Pending** - Brand sends payment
8. **Completed** - Creator confirms payment

## Design Principles

- Mobile-first responsive design
- Clean, minimal UI inspired by Linear/Stripe
- Large touch targets for mobile
- Clear visual hierarchy
- One primary action per screen
- Sticky CTAs on mobile

## License

MIT# creator_armour
