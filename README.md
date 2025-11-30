# IndiQuant Frontend
> The participant-facing dashboard for the IndiQuant crowdsourced forecasting platform.

## Overview
This repository contains the official frontend for IndiQuant — where data scientists:
- Download anonymized datasets
- Submit predictions for weekly rounds
- Track their leaderboard rankings & rewards

The design emphasizes simplicity, transparency, and fairness.

## Tech Stack
- **Next.js** (React Framework)
- **TypeScript**
- **TailwindCSS**
- **REST/GraphQL** API integration (with IndiQuant Backend)
- **Auth0 / JWT** for authentication (planned)

## Folder Structure
```
.
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Views: dashboard, leaderboard, etc.
│ ├── hooks/ # Frontend logic hooks
│ ├── styles/ # Tailwind configs
│ └── utils/ # Helpers & API client
└── README.md
```

## Running Locally
```bash
npm install
npm run dev
```
Visit http://localhost:3000 
## APIs Used
| Feature |	Endpoint | Status |
|---------|----------|--------|
| Authentication |	/auth/* | planned |
| Leaderboard |	/leaderboard |	MVP |
| Submission Upload |	/submit |	MVP |
| Dataset Download |	/datasets/latest |	MVP |

## Product Roadmap
- Submission validation UI
- Model performance graphs 
- Multi-round history tracking 
- Dark mode 
- Advanced account analytics 
## License
MIT License — fully open to contributors
(Brand assets excluded → see /branding repo)