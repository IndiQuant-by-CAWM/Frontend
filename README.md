# IndiQuant Frontend
> Modern React UI for data scientists: upload predictions, view rankings, track scores

## 🎯 MVP Purpose
The Frontend is the **user experience layer** that enables data scientists to:
1. **Upload CSV predictions** - simple drag-and-drop interface with instant validation
2. **View live leaderboard** - see rankings by predictive power (Spearman correlation)
3. **Track personal metrics** - submission count, average score, profit ratio
4. **Monitor tournaments** - see active contests, submission deadlines, rules
5. **Understand results** - profit vs trash categorization, badges, achievements

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────┐
│ React + Vite                                       │
│ Modern frontend build tool (fast dev, optimized)  │
│                                                    │
│ ├─ pages/                                          │
│ │  ├─ Dashboard.jsx    # Main stats + tournaments │
│ │  ├─ Upload.jsx       # CSV submission interface │
│ │  ├─ Leaderboard.jsx  # Rankings + filtering     │
│ │  ├─ Login.jsx        # Auth via JWT token       │
│ │  └─ Profile.jsx      # User stats + history     │
│ │                                                  │
│ ├─ components/                                     │
│ │  ├─ UploadArea.jsx   # Drag-drop CSV upload     │
│ │  ├─ LeaderboardTable.jsx # Ranked user table    │
│ │  ├─ Countdown.jsx    # Submission deadline      │
│ │  ├─ Navbar.jsx       # Top navigation           │
│ │  └─ Toast.jsx        # Notification popups      │
│ │                                                  │
│ ├─ hooks/                                          │
│ │  ├─ useAuth.js       # Auth state management    │
│ │  └─ useTournament.js # Tournament data fetching │
│ │                                                  │
│ └─ styles/                                         │
│    └─ Tailwind CSS (utility-first styling)        │
│                                                    │
└────────────────────────────────────────────────────┘
```

## 🎨 Key Pages & Components

### 1. Dashboard.jsx
**What it shows**: User's overall performance + active tournaments

```
┌─────────────────────────────────────────────────────┐
│ IndiQuant Dashboard                                 │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Quick Stats                                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│ │Your Rank │ │Submisns  │ │Avg Score │ │Badges  │ │
│ │   #5     │ │    12    │ │  0.42    │ │   2    │ │
│ │7-day     │ │total     │ │Spearman  │ │top-10  │ │
│ └──────────┘ └──────────┘ └──────────┘ └────────┘ │
│                                                     │
│ Active Tournaments                                  │
│ ┌────────────────────┐ ┌────────────────────┐    │
│ │NSE Top 100         │ │NSE Momentum        │    │
│ │Status: OPEN        │ │Status: OPEN        │    │
│ │Closes in: 02:15:30 │ │Closes in: 18:45:12 │   │
│ │Stocks: 100         │ │Stocks: 50          │    │
│ │[Submit] [Details]  │ │[Submit] [Details]  │    │
│ └────────────────────┘ └────────────────────┘    │
│                                                     │
│ Quick Links: [View Leaderboard] [Submit Pred...]  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Data flow**:
```javascript
// Dashboard.jsx
const { tournaments, stats, isLoading } = useTournament()
// Calls GET /api/v1/tournaments → Backend API
// Calls GET /api/v1/leaderboard/user/{user_id} → User stats
```

### 2. Upload.jsx
**What it does**: CSV file submission with instant validation feedback

```
┌─────────────────────────────────────────────────────┐
│ 📤 Submit Your Predictions                           │
│ Upload your CSV with stock predictions              │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌──────────────────────────────────────────────┐   │
│ │  📁  Drag CSV here or click to select        │   │
│ │                                               │   │
│ │  Supported format:                           │   │
│ │  Stock_ID,Score                              │   │
│ │  INFY,0.85                                   │   │
│ │  TCS,0.72                                    │   │
│ │  ...                                         │   │
│ └──────────────────────────────────────────────┘   │
│                  [Choose File]                      │
│                                                     │
│ Tournament: NSE Top 100                            │
│ Deadline: 2025-12-31 15:30:00                      │
│ Submissions allowed: 3 per tournament              │
│                                                     │
│                      [Upload Prediction]            │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Recent Submissions                                  │
│ ┌─────────────────────────────────────────────┐   │
│ │2025-12-31 14:23 │ ✅ Valid  │ ID: 1523      │   │
│ │2025-12-31 13:15 │ ✅ Valid  │ ID: 1522      │   │
│ │2025-12-30 15:45 │ ❌ Invalid│ ID: 1521      │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Data flow**:
```javascript
// Upload.jsx → UploadArea.jsx
const handleUpload = async (formData, tournamentId) => {
  const response = await fetch(
    `/api/v1/submit/?tournament_id=${tournamentId}`,
    { method: 'POST', body: formData }
  )
  // Backend: app/api/v1/submissions.py POST /submit
  // Validates CSV, stores in PostgreSQL, returns response
}
```

**Validation on upload**:
- CSV must have columns: `Stock_ID`, `Score`
- All scores must be numeric (-1 to 1 range for correlations, or 0-1 for normalized)
- No NaN/null values allowed
- Stock_ID must be in tournament's allowed list
- File size < 10MB
- Max 1000 stocks per submission

**User feedback**:
```json
{
  "status": "Submission Failed ❌",
  "errors": [
    "Missing column 'Score'",
    "Row 3: Invalid numeric value '0.abc'",
    "Stock 'UNKNOWN' not in tournament"
  ],
  "file_name": "my_predictions.csv"
}
```

### 3. Leaderboard.jsx
**What it shows**: Ranked list of all data scientists by predictive power

```
┌─────────────────────────────────────────────────────┐
│ 📊 Leaderboard - Rankings by Predictive Power       │
│                                                     │
│ Period: [7d] [30d] [90d] [All-time]               │
│ Category: [All] [Profitable] [Neutral] [Trash]    │
│                                                     │
├─────────────────────────────────────────────────────┤
│ # │ Data Scientist │ Avg Score │ Submissns │ Badge │
├───┼────────────────┼───────────┼───────────┼───────┤
│ 1 │ Alice_ML       │ 0.68 ✅   │    45     │ ⭐⭐⭐ │
│ 2 │ Bob_Quant      │ 0.52 ✅   │    32     │ ⭐⭐   │
│ 3 │ Charlie_AI     │ 0.28 ✅   │    28     │ ⭐    │
│ 4 │ Diana_Trading  │ 0.05 ⚠️   │    15     │       │
│ 5 │ Eve_Algo       │ -0.35 ❌  │    52     │       │
│ 6 │ Frank_RL       │ -0.62 ❌  │    18     │       │
├───┴────────────────┴───────────┴───────────┴───────┤
│                                                     │
│ Filter by period, view details, see profit metrics │
│ Click any row to view user profile                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Legend**:
- `✅ > 0.3` = PROFITABLE (has statistical edge)
- `⚠️ -0.3 to 0.3` = NEUTRAL (random/no edge)
- `❌ < -0.3` = TRASH (negative edge)
- `⭐⭐⭐` = Top 10 globally badge

**Data flow**:
```javascript
// Leaderboard.jsx
const [leaderboard, setLeaderboard] = useState([])

useEffect(() => {
  const fetchLeaderboard = async () => {
    const res = await fetch(
      `/api/v1/leaderboard?period=7d&limit=100&offset=0`
    )
    // Backend: app/api/v1/leaderboard.py GET /leaderboard
    // Queries PostgreSQL, ranks users, caches in Redis
    setLeaderboard(await res.json())
  }
  fetchLeaderboard()
}, [period])
```

### 4. Profile.jsx
**What it shows**: Individual user stats, submission history, achievements

```
┌─────────────────────────────────────────────────────┐
│ Profile: Alice_ML                                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Statistics                                          │
│ ┌──────────┐ ┌──────────┐ ┌──────────────┐        │
│ │Rank      │ │Win Rate  │ │Profit Ratio  │        │
│ │#1 (7-day)│ │ 85% >0.3 │ │ 42 prof / 3 trash │
│ └──────────┘ └──────────┘ └──────────────┘        │
│                                                     │
│ Badges & Achievements                              │
│ ⭐⭐⭐ Top 10 Global  🏆 Consistency Master         │
│ 🎖️  Week Champion    🚀 Rising Star                │
│                                                     │
│ Submission History (Last 10)                        │
│ ┌──────────┬────────┬───────┬──────────────┐      │
│ │Date      │Score   │Status │Tournament    │      │
│ ├──────────┼────────┼───────┼──────────────┤      │
│ │12-31 15:2│ 0.68   │Scored │NSE Top 100   │      │
│ │12-31 12:5│ 0.42   │Scored │NSE Top 100   │      │
│ │12-30 15:4│ 0.15   │Scored │NSE Momentum  │      │
│ │12-30 10:3│ 0.55   │Scored │NSE Top 100   │      │
│ └──────────┴────────┴───────┴──────────────┘      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 🔄 Data Flow: CSV Upload to Leaderboard

```javascript
/*
┌──────────────────────────────────┐
│ User selects CSV file            │
│ (UploadArea.jsx: <input type="file"> │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│ Frontend validates locally               │
│ - Check file extension (.csv)            │
│ - Check file size < 10MB                 │
│ - Preview first 5 rows                   │
│ - Show error if invalid                  │
│                                          │
│ If valid → FormData with file            │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────┐
│ POST /api/v1/submit/?tournament_id=1                │
│ Body: FormData(file)                                │
│ Headers: Authorization: Bearer {jwt_token}          │
│                                                      │
│ Backend (Backend/app/api/v1/submissions.py):        │
│ 1. Get current user from JWT                        │
│ 2. Validate tournament exists & is OPEN             │
│ 3. Read CSV, parse with pandas                      │
│ 4. Validate columns, values, stock IDs              │
│ 5. Compute file hash (dedup detection)              │
│ 6. Store in PostgreSQL Submission table             │
│ 7. Return response:                                 │
│    {submission_id, validation_status, errors}       │
└──────────────┬───────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│ Frontend displays result                 │
│ ✅ Success: Show submission ID + details │
│ ❌ Error: Display validation errors      │
│                                          │
│ Add to "Recent Submissions" list         │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│ Hourly batch: tournament_lifecycle.py    │
│ 1. Create new Tournament record          │
│ 2. Fetch all submissions from past hour  │
│ 3. Load realized returns (actual market) │
│ 4. Queue submissions for scoring via     │
│    Celery + Redis                        │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│ Scoring workers: scoring_tasks.py        │
│ Process queue in parallel:               │
│ 1. Load submission data                  │
│ 2. Compute Spearman correlation          │
│ 3. Apply anti-cheat rules                │
│ 4. Store Score record in PostgreSQL      │
│ 5. Update Submission.is_scored = true    │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│ Leaderboard service: leaderboard_service │
│ 1. Query all scores from PostgreSQL      │
│ 2. Compute avg_score per user            │
│ 3. Rank users descending by avg_score    │
│ 4. Cache in Redis (30min TTL)            │
│ 5. Return to Frontend on demand          │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│ GET /api/v1/leaderboard?period=7d       │
│ Frontend fetches + displays rankings     │
│ User sees:                               │
│ - Their rank                             │
│ - Avg score (correlation)                │
│ - Category badge (Profit/Neutral/Trash)  │
│ - Other competitors ranked by score      │
└──────────────────────────────────────────┘
*/
```

## 🛠️ Tech Stack

```json
{
  "framework": "React 18.2",
  "bundler": "Vite 4.5 (instant hot reload)",
  "css": "Tailwind CSS (utility-first)",
  "router": "React Router v6 (client-side routing)",
  "http": "Axios (REST API calls)",
  "forms": "React Hook Form (simple form management)",
  "charts": "Recharts (data visualization)",
  "animation": "Framer Motion (smooth transitions)",
  "date": "date-fns (date formatting)"
}
```

## 📦 Project Structure

```
Frontend/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main landing, tournament list
│   │   ├── Upload.jsx          # CSV submission
│   │   ├── Leaderboard.jsx     # Rankings table
│   │   ├── Login.jsx           # Auth form
│   │   ├── Signup.jsx          # Registration
│   │   ├── Profile.jsx         # User stats
│   │   ├── AuthLogin.jsx       # OAuth integration
│   │   └── AuthSignup.jsx      # OAuth registration
│   │
│   ├── components/
│   │   ├── UploadArea.jsx      # Drag-drop zone
│   │   ├── LeaderboardTable.jsx # Ranked users
│   │   ├── Countdown.jsx       # Timer to deadline
│   │   ├── Navbar.jsx          # Navigation + user menu
│   │   ├── Footer.jsx          # Footer + links
│   │   ├── ErrorBoundary.jsx   # Error handling
│   │   ├── Toast.jsx           # Notifications
│   │   └── SiteFooter.jsx      # Legal links
│   │
│   ├── hooks/
│   │   ├── useAuth.js          # Auth state
│   │   ├── useTournament.js    # Tournament API
│   │   └── useLeaderboard.js   # Leaderboard API
│   │
│   ├── context/
│   │   └── AuthContext.jsx     # Global auth state
│   │
│   ├── utils/
│   │   ├── auth.js             # JWT token management
│   │   └── api.js              # Axios instance config
│   │
│   ├── styles/
│   │   └── index.css           # Tailwind imports
│   │
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Vite entry point
│   └── index.js                # React DOM render
│
├── public/
│   └── [static assets]         # Images, favicons
│
├── vite.config.js              # Bundler config
├── tailwind.config.js          # CSS config
├── package.json                # Dependencies
├── .env.example                # Environment template
└── .gitignore                  # Git ignores
```

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env to point to Backend API (default: http://localhost:5000)

# Start dev server (hot reload)
npm run dev
# Opens http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Authentication

Integrates with Auth service (JWT tokens):

```javascript
// utils/auth.js
export const login = async (email, password) => {
  const res = await fetch('http://localhost:8001/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const { token } = await res.json()
  localStorage.setItem('token', token)  // Store JWT
  return token
}

export const getToken = () => localStorage.getItem('token')

// In API calls:
const res = await fetch('/api/v1/leaderboard', {
  headers: { 'Authorization': `Bearer ${getToken()}` }
})
```

## 📊 Performance Optimizations

- **Code splitting**: Lazy-load pages with `React.lazy()`
- **Caching**: Redis caching on Backend (leaderboard 30min TTL)
- **Debouncing**: Debounce leaderboard filters to reduce API calls
- **Pagination**: Limit to 100 rows per load
- **Image optimization**: Responsive images via Tailwind
- **Bundling**: Vite automatically tree-shakes unused code

## 🎨 Design System

- **Colors**: Custom theme in `tailwind.config.js`
- **Spacing**: Tailwind's 4px grid system
- **Typography**: System fonts for fast loading
- **Icons**: Emoji + simple SVG icons
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## 📱 Responsive Design

All pages are mobile-first with Tailwind breakpoints:
- `sm` (640px) - Small phones
- `md` (768px) - Tablets
- `lg` (1024px) - Desktops
- `xl` (1280px) - Large screens

## 🧪 Testing

```bash
# Install testing library
npm install --save-dev @testing-library/react vitest

# Run tests
npm run test

# Watch mode
npm run test:watch
```

## 📈 Roadmap

**MVP (Current)**:
- ✅ CSV upload with validation
- ✅ Leaderboard with sorting/filtering
- ✅ Dashboard with stats
- ✅ User profile

**Q1 2026**:
- Real-time leaderboard updates (WebSocket)
- User portfolio visualization (Recharts)
- Email notifications for score changes
- Dark mode toggle

**Q2 2026**:
- Advanced filtering (by score range, tournament, date)
- User badges/achievements UI
- Performance analytics dashboard
- Export submission history

**Q3 2026**:
- Community features (follow users, see strategies)
- Model comparison tool (which models beat mine?)
- API key generation for programmatic uploads
- Backtesting simulation interface

## 🔐 Security
- JWT token in localStorage (with HttpOnly option)
- HTTPS in production
- CORS headers configured on Backend
- Rate limiting on API endpoints

## License
Proprietary — Internal IndiQuant IP.  
No redistribution without permission.
