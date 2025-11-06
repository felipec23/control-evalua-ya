# Control Evalua Ya - Backend Server

This is the backend API server for Control Evalua Ya, which processes CVs using Google's Gemini AI.

## Setup

1. Install dependencies:

```bash
cd server
npm install
```

2. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

3. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey) and add it to `.env`:

```
GEMINI_API_KEY=your_actual_api_key_here
PORT=3001
```

## Running the Server

### Development mode (with auto-reload):

```bash
npm run dev
```

### Production mode:

```bash
npm run build
npm start
```

## API Endpoints

### POST /api/process-cv

Processes a CV and evaluates experience and postgraduate relevance.

**Request Body:**

```json
{
  "candidateName": "Juan Pérez",
  "pdfBase64": "base64_encoded_pdf_content",
  "requiredMonths": 24
}
```

**Response:**

```json
{
  "experienceMonths": 36,
  "experienceMeets": true,
  "postgraduateRelevance": 85,
  "extraction": {
    "raw": { ... },
    "experienceEval": { ... },
    "postgraduateEval": { ... }
  }
}
```

### GET /health

Health check endpoint.

**Response:**

```json
{
  "status": "ok"
}
```

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required)
- `PORT`: Server port (default: 3001)
