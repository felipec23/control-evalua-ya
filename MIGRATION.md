# Migration Summary: Removing Lovable & Supabase

## What Changed

### ✅ Removed Dependencies

- **Lovable AI Gateway** - Replaced with direct Google Gemini API calls
- **Supabase Functions** - Replaced with a standalone Express server
- **lovable-tagger** - Removed from Vite config

### 🆕 New Components

#### Backend Server (`/server`)

- **Express.js API** - Standalone Node.js server
- **Google Gemini AI** - Direct integration via `@google/generative-ai`
- **TypeScript** - Fully typed server code
- **Environment Variables** - Secure API key management

#### Files Created:

```
server/
├── index.ts                 # Main server file
├── routes/
│   └── process-cv.ts       # CV processing route
├── package.json            # Server dependencies
├── tsconfig.json           # TypeScript config
├── .env.example            # Environment template
├── .gitignore             # Git ignore rules
└── README.md              # Server documentation
```

### 🔄 Modified Files

#### Frontend Changes:

- **`src/components/steps/Step4Processing.tsx`**

  - Removed `supabase` import
  - Added direct `fetch()` calls to new API
  - Better error handling with detailed messages

- **`vite.config.ts`**

  - Removed `lovable-tagger` import and plugin

- **`package.json`**

  - Added `dev:all` script to run both servers
  - Added `concurrently` dependency

- **`README.md`**
  - Updated with new setup instructions
  - Added backend setup steps
  - Removed Lovable references

#### New Root Files:

- **`.env.example`** - Frontend environment template
- **`start.sh`** - Convenience script to run both servers

## Setup Instructions

### 1. Get a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment

```bash
cd server
cp .env.example .env
# Edit .env and paste your Gemini API key:
# GEMINI_API_KEY=your_key_here
```

### 4. Install Frontend Dependencies (if not already done)

```bash
cd ..
npm install
```

### 5. Run Both Servers

**Option A: Using npm script (recommended)**

```bash
npm run dev:all
```

**Option B: Using start script**

```bash
./start.sh
```

**Option C: Manually in separate terminals**

Terminal 1 (Backend):

```bash
cd server
npm run dev
```

Terminal 2 (Frontend):

```bash
npm run dev
```

## API Endpoints

### POST `/api/process-cv`

Processes a CV and evaluates experience.

**Request:**

```json
{
  "candidateName": "Juan Pérez",
  "pdfBase64": "base64_string...",
  "requiredMonths": 24
}
```

**Response:**

```json
{
  "experienceMonths": 36,
  "experienceMeets": true,
  "postgraduateRelevance": 85,
  "extraction": { ... }
}
```

## Architecture Changes

### Before:

```
Frontend → Supabase Edge Function → Lovable AI Gateway → Gemini
```

### After:

```
Frontend → Express API → Google Gemini API
```

## Benefits

✅ **No vendor lock-in** - Direct control over your infrastructure
✅ **Cost control** - Pay only for Gemini API usage
✅ **Flexibility** - Easier to modify, test, and deploy
✅ **Transparency** - Full visibility into API calls and responses
✅ **Local development** - Run everything locally without cloud dependencies

## Next Steps (Optional)

1. **Remove Supabase completely** (if not needed for other features):

   ```bash
   npm uninstall @supabase/supabase-js
   rm -rf src/integrations/supabase
   rm -rf supabase
   ```

2. **Remove lovable-tagger** (if not needed):

   ```bash
   npm uninstall lovable-tagger
   ```

3. **Deploy backend** - Consider deploying to:

   - Vercel (with serverless functions)
   - Railway
   - Render
   - DigitalOcean App Platform
   - Your own VPS

4. **Environment variables for production**:
   - Set `VITE_API_URL` to your deployed backend URL
   - Ensure `GEMINI_API_KEY` is set in your production environment

## Troubleshooting

### Backend won't start

- Check that `GEMINI_API_KEY` is set in `server/.env`
- Verify dependencies are installed: `cd server && npm install`

### Frontend can't connect to backend

- Ensure backend is running on port 3001
- Check `VITE_API_URL` in `.env` (create from `.env.example`)
- Verify no CORS errors in browser console

### API errors

- Check Gemini API key is valid
- Verify you haven't exceeded API quotas
- Check server logs for detailed error messages
