# Softlend Frontend

A modern React + Vite + TypeScript frontend for Softlend, a fintech platform combining a loan marketplace with an intelligent credit improvement experience.

This repository implements a production-style frontend with:
- Credit dashboard with a score gauge, health summary, and score factor explanations
- Loan offers catalog with search, filter, loading/error/empty states, and offer preview modal
- Accessible keyboard-navigable modal flow for accepting offers
- Score Simulator and EMI Calculator bonus pages
- Mocked authentication and local state-driven interactions

## Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```powershell
cd "C:\Users\OMII\Downloads\softlend.frontend"
npm install
```

### Run locally

```powershell
npm run dev
```

Open http://localhost:5173 and use the application.

## Features

- **Credit Dashboard** — dynamic credit score gauge with health summary, detailed score factors, and AI-style improvement recommendations
- **Loan Offers** — grid-based loan catalog with lender information and eligibility lock state when score is below threshold
- **Search & Filter** — real-time debounced search (300ms) with multi-criteria filtering by lender name, ID, status, and amount range
- **State Management** — explicit loading, error, and empty-state UI components for all data scenarios
- **Offer Modal** — accessible, keyboard-navigable modal with comprehensive offer summary and user confirmation flow

## Bonus Features

- **Score Simulator** — interactive tool to explore projected credit score changes and preview loan eligibility scenarios
- **EMI Calculator** — dynamic loan affordability calculator with interactive sliders for principal, rate, and tenure

## Business Logic

- The app demonstrates a full frontend flow including mocked authentication, protected routes, and offer acceptance interactions.
- Mock authentication uses stored credentials and grants access to the `Softlend` dashboard navigation.
- The project contains sample user data and credit state logic to support loan eligibility and score projection.

## Installation & Build

```powershell
npm install
npm run dev
```

To build and preview production output:

```powershell
npm run build
npm run preview
```

## Notes

- The repository is designed for frontend assessment and can be extended with real API calls or a mocked HTTP server.
- The current implementation uses in-app mock data and local storage-driven auth.

## Default credentials

- Username: `intern`
- Password: `intern123`

## Auth behavior

The auth flow is mocked in `src/auth/auth.ts`. Use the default credentials to sign in, then access the dashboard and offers pages.
