# Softlend Frontend

A modern React + Vite + TypeScript frontend for Softlend, a fintech platform combining a loan marketplace with an intelligent credit improvement experience.

## Project Overview

| Area | Details |
| --- | --- |
| Framework | React 18 + Vite + TypeScript |
| Features | Credit dashboard, loan catalog, search/filter, offer modal, score simulator, EMI calculator |
| Auth | Mock auth with local storage and protected routes |
| Data | Mocked offer and score data stored in app state |
| Repository folder | `softlend.frontend om anna final/softlend.frontend` |

## Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Recommended setup

Open a terminal and run:

```powershell
cd "C:\Users\OMII\Downloads\softlend.frontend\softlend.frontend om anna final\softlend.frontend"
npm install
npm run dev
```

> Use the URL shown in the terminal, for example `http://localhost:5173`.

### Troubleshooting localhost

If the app does not open at `http://localhost:5173`:
- Confirm you ran `npm run dev` from the nested folder above
- Use the exact URL shown in the terminal output
- Check for an alternative port if 5173 is already in use
- Refresh the browser after the dev server starts

## Feature Summary

| Feature | Description |
| --- | --- |
| Credit Dashboard | Dynamic score gauge, health summary, and score factor recommendations |
| Loan Offers | Grid-based offer list with lender details and eligibility state |
| Search & Filter | 300ms debounced search + multi-criteria filter on lender, status, ID, and amount |
| State Handling | Dedicated loading, error, and empty UI screens |
| Offer Modal | Accessible offer detail modal with confirmation flow |
| Score Simulator | Simulated score changes and eligibility preview |
| EMI Calculator | Affordability calculator with range sliders |

## Commands

| Command | Meaning |
| --- | --- |
| `npm install` | Install project dependencies |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production build locally |

## Notes

- The app uses mobile-style mock state and local storage auth.
- The project is intended for frontend assessment and can be extended with API integration or mock HTTP responses.

## Default credentials

- Username: `intern`
- Password: `intern123`

## Auth behavior

Mock auth is implemented in `src/auth/auth.ts`. Use the credentials above to sign in and access the protected dashboard.
