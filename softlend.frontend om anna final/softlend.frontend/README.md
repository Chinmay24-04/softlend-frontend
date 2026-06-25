# Softlend Frontend (scaffold)

This scaffold implements a minimal React + Vite + TypeScript frontend with mock offers, a search with 300ms debounce, loading/error/empty states, an Accept Offer modal, and two bonus pages (Score Simulator and EMI Calculator).

Quick start (PowerShell):

```powershell
cd "C:\Users\OMII\Downloads\archive (1)\gender_age_detection\softlend.frontend"
npm install
npm run dev
```

Open http://localhost:5173 and navigate to `/offers` to see the Loan Offers page.

Next steps:
- Implement API calls or use MSW for richer mocks.
- Improve styling (Tailwind or MUI).
- Add form validation, accept-offer flow persistence, and tests.

Build and prepare for submission
- Install dependencies (if you haven't already):

```powershell
npm install
```

- Run dev server:

```powershell
npm run dev
```

- Build production bundle and preview:

```powershell
npm run build
npm run preview
```

- Create a GitHub repo, push your branch, and include this README.md and a short notes.txt describing which features are implemented and screenshots.

Checklist for submission
- Credit Dashboard page (basic snapshot)
- Loan Offers list with Search (300ms debounce), Filters (tenure, interest), Loading/Error/Empty states
- Accept Offer modal (mock flow)
- Score Simulator and EMI Calculator pages

If you'd like, I can: wire MSW for mocked HTTP responses, persist accepted offers in localStorage, or polish the UI further.

Default credentials (demo)
- Username: `intern`
- Password: `intern123`

How auth works (mock)
- This project uses a small localStorage-based mock auth in `src/auth/auth.ts`. Use the credentials above to sign in. After signing in you'll see the `Softlend` header with navigation and your name.

