meristerm New Trustees Web Frontend

This repository contains the frontend code for the meristerm New Trustees insurance application. It is built using React (Vite) with TypeScript, utilizing Chakra UI for styling, Redux Toolkit for state management, and React Router for navigation.

📂 Project Structure

The project is well-organized to maintain scalability and maintainability. Below is a breakdown of the folder structure:

📦 new-trustees-web-frontend
├── 📂 public/ # Static assets (favicons, public images, etc.)
├── 📂 src/ # Main source code directory
│ ├── 📂 assets/ # Static assets (images, icons, fonts, etc.)
│ ├── 📂 components/ # Reusable components
│ │ ├── 📂 auth/ # Authentication-related components
│ │ ├── 📂 common/ # Shared components used across multiple pages
│ │ ├── 📂 dashboard/ # Dashboard-specific components
│ ├── 📂 config/ # Configuration files (API endpoints, constants, etc.)
│ ├── 📂 hooks/ # Custom React hooks
│ ├── 📂 pages/ # Page components (route-based organization)
│ │ ├── 📂 auth/ # Authentication pages (Login, Register, etc.)
│ │ ├── 📂 dashboard/ # Dashboard pages
│ │ ├── 📂 onboarding/ # Onboarding-related pages
│ ├── 📂 store/ # Redux store setup
│ │ ├── 📂 slices/ # Redux slices for state management
│ ├── 📂 utils/ # Utility functions/helpers
│ ├── 📜 App.tsx # Root component
│ ├── 📜 main.tsx # Entry point
│ ├── 📜 routes.tsx # Application routing
│ ├── 📜 theme.ts # Chakra UI theme configuration
├── 📜 .eslintrc.js # ESLint configuration
├── 📜 .gitignore # Git ignore file
├── 📜 package.json # Dependencies and scripts
├── 📜 tsconfig.json # TypeScript configuration
├── 📜 README.md # Documentation
└── 📜 yarn.lock # Dependency lock file (using Yarn)

🛠️ Technologies Used
• React (Vite) – Fast build tool for modern frontend applications
• TypeScript – Strongly typed JavaScript for maintainability
• Chakra UI – Component-based styling for a modern UI
• Redux Toolkit – State management across the application
• React Router – Navigation and routing system
• Framer Motion – Animations and transitions
• Formik + Yup – Form handling and validation
• ESLint + Prettier – Code formatting and linting

🚀 Getting Started

Prerequisites

Ensure you have the following installed:
• Node.js (>= 16.x recommended)
• Yarn (preferred package manager)

Installation 1. Clone the repository:

    2.	Install dependencies:

yarn install

    3.	Start the development server:

yarn dev

    4.	Build for production:

yarn build

📌 Code Structure Guidelines

🔹 Components Organization
• Reusable components are inside src/components/
• Components are grouped based on usage:
• Auth-related components → src/components/auth/
• Common/shared components → src/components/common/
• Dashboard-specific components → src/components/dashboard/

🔹 State Management (Redux)
• Redux state slices are inside src/store/slices/
• Each slice contains actions, reducers, and initial states.

🔹 API Calls
• API service functions are placed inside src/api/
• Axios is recommended for making HTTP requests.
