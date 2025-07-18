# RentLah!

RentLah! helps university students in Singapore discover, compare, and safely book accommodations near campuses. It features verified listings, map search, chat, and an interactive, student-friendly interface.

### 📌 Features

- ✅ **Verified Listings:** All properties are vetted for safety and accuracy.
- 💸 **Student Budget Filters:** Search and compare listings by budget.
- 📍 **Campus Proximity:** Locate properties close to your university or school.
- 🧑‍🎓 **Student Community:** Chat with landlords and potential roommates.
- 🗺️ **Google Maps Integration:** Interactive location search experience.
- 📱 **Modern Responsive UI:** Built with Tailwind CSS & shadcn/ui.

### 💡 Tech Stack
| Technology        | Use                                           |
|-------------------|-----------------------------------------------|
| **Next.js**       | React framework for SSR, SSG, routing         |
| **Node.js**       | Runtime for backend/server-side logic         |
| **Tailwind CSS**  | Utility-first CSS framework for UI styling    |
| **shadcn/ui**     | UI component library built on Radix UI        |
| **Vercel**        | Platform for deployment and hosting           |
| **Neon Database** | Serverless Postgres storage (managed DB)      |
| **PostgreSQL**    | Relational database used for application data |
| **Drizzle ORM**   | Bridging between OOP and relational database  |
| **Better Auth**   | Authentication (O-Auth, email)                |
| **Socket Io**     | For messaging backend                         |
| **nuqs**          | Type-safe search params state manager         |
| **Theme Provider**| Enabling light and dark mode


## 🚀 Getting Started

### ✅ Prerequisites
- Node.js (v18+ recommended)
- npm (or yarn/pnpm/bun)

### 📦 Installation
1. Clone the repo:
    ```bash
    git clone https://github.com/wltdwinnie/RentLah-HEAP.git
    cd RentLah-HEAP/rentlah/client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## 🗂 Directory Structure
```bash
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
```
## 🔐 Environment Variables
Create a `.env.local` in the client directory and add all required keys.
```bash
DATABASE_URL=
PGHOST=
PGDATABASE=
PGUSER=
PGPASSWORD=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
NEXT_PUBLIC_AUTH_URL=
BETTER_AUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

UPLOADTHING_TOKEN=

GOOGLE_REDIRECT_URL=

EMAIL_PASSWORD=
EMAIL_USERNAME=
```


## ☁️ Deployment
Deploying to Vercel
1. Connect your GitHub account on Vercel.
2. Import this repository.
3. Set the project root to /client when prompted.
4. Framework: Next.js
5. Add required environment variables in Project Settings.
6. Click Deploy. 

## 👨‍💻 Project Contributors
- Aung Ye Thant Hein
- Chue Myat Sandy
- Htet Shwe Win Than
- Lin Khant Pe Thein
- Win Lei Thawdar