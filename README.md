# HEAP

## Directory Structure (Tentative)
```
rentlah/                      
│
├── client/                   # React frontend
│   ├── node_modules/         # Frontend dependencies (auto-generated)
│   ├── public/               # Static files (index.html, favicon, etc.)
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/                  # React source code
│   │   ├── assets/           # Images, fonts, etc.
│   │   ├── components/       # Reusable React components
│   │   │   └── Navbar.js
│   │   ├── pages/            # Page-level components (e.g., Home, Listings)
│   │   │   └── Home.js
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useAuth.js
│   │   ├── services/         # API calls and service logic
│   │   │   └── api.js
│   │   ├── App.js            # Main App component
│   │   ├── index.js          # Entry point for React
│   │   └── App.css           # Global styles
│   ├── .env                  # Frontend environment variables
│   ├── package.json          # Frontend dependencies & scripts
│   └── README.md             # Frontend-specific documentation
│
├── server/                   # Backend (Node.js/Express)
│   ├── node_modules/         # Backend dependencies (auto-generated)
│   ├── src/                  # Backend source code
│   │   ├── controllers/      # Route handler logic
│   │   │   └── userController.js
│   │   ├── models/           # Database models/schemas
│   │   │   └── userModel.js
│   │   ├── routes/           # API route definitions
│   │   │   └── userRoutes.js
│   │   ├── middlewares/      # Express middlewares (auth, error handling)
│   │   │   └── authMiddleware.js
│   │   ├── utils/            # Utility/helper functions
│   │   │   └── hashPassword.js
│   │   ├── config/           # Configuration files (e.g., db connection)
│   │   │   └── db.js
│   │   └── index.js          # Entry point for Express server
│   ├── .env                  # Backend environment variables (DB_URI, etc.)
│   ├── package.json          # Backend dependencies & scripts
│   └── README.md             # Backend-specific documentation
│
├── shared/                   # (Optional) Shared code (e.g., types, validation)
│   └── validation.js
│
├── .gitignore                # Ignore node_modules, .env, etc.
├── README.md                 # Main project documentation
└── package.json              # (Optional) Root-level scripts (e.g., concurrently)

```

## Getting Started

### Frontend
cd client
npm install
npm start

### Backend
cd server
npm install
npm run dev
