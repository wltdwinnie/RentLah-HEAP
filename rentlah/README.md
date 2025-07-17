# RentLah!

RentLah! helps university students in Singapore discover, compare, and safely book accommodations near campuses. It features verified listings, map search, chat, and an interactive, student-friendly interface.

### Features
- Verified Listings: All properties are vetted for safety and accuracy.
- Student Budget Filters: Search and compare listings by budget.
- Campus Proximity: Locate properties close to your chosen university or school.
- Student Community: Chat with landlords and potential roommates.
- Google Maps Integration: Interactive location search.
- Modern Responsive UI: Built with shadcn/ui and Tailwind CSS for a seamless experience.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (or yarn/pnpm/bun)

### Installation
1. Clone the repo:
    
    git clone https://github.com/wltdwinnie/RentLah-HEAP.git
    cd RentLah-HEAP/rentlah/client
    2. Install dependencies:
    
    npm install
    
Running the Development Server
npm run devOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Directory Structure
RentLah-HEAP/
└── rentlah/
    └── client/
        ├── public/
        │   ├── assets/
        │   ├── logos/
        │   ├── sample-photo-1.jpeg
        │   ├── sample-photo-2.jpeg
        │   ├── sample-photo-3.jpeg
        │   └── ...other static files
        ├── src/
        │   ├── app/             # Next.js app directory (routing, pages)
        │   ├── components/      # Reusable React components
        │   ├── db/              # (If you use a local DB layer or mocks)
        │   ├── hooks/           # Custom React hooks
        │   ├── lib/             # Utility functions, type definitions, API clients
        │   ├── styles/          # CSS modules, global styles (can be 'styles' or just CSS files)
        │   └── utils/           # Misc utilities
        ├── .env.local           # Local development environment variables
        ├── .gitignore
        ├── next.config.ts       # Next.js config (could be .js as well)
        ├── package.json
        ├── postcss.config.mjs
        ├── tailwind.config.ts
        ├── tsconfig.json
        └── README.md
## Environment Variables
Create a .env.local in the client directory and add all required keys.


## Deployment
Deploying to Vercel
1. Connect your GitHub account on Vercel.
2. Import this repository.
3. Set the project root to /client when prompted.
4. Framework: Next.js
5. Add required environment variables in Project Settings.
6. Click Deploy.