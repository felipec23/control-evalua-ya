# Control Evalua Ya

A web application for evaluating CVs against control interno requirements.

## Project Structure

- `/src` - Frontend React application
- `/server` - Backend API server using Express and Google Gemini AI

## Setup

### Frontend

1. Install dependencies:

```sh
npm install
```

2. Create a `.env` file:

```sh
cp .env.example .env
```

3. Update the API URL in `.env` if needed (default is `http://localhost:3001`)

4. Run the development server:

```sh
npm run dev
```

The frontend will be available at `http://localhost:8080`

### Backend

1. Navigate to the server directory:

```sh
cd server
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file and add your Gemini API key:

```sh
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

4. Run the development server:

```sh
npm run dev
```

The API will be available at `http://localhost:3001`

## Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to `server/.env`

## Running Both Servers

You can run both the frontend and backend simultaneously in separate terminals:

**Terminal 1 (Backend):**

```sh
cd server
npm run dev
```

**Terminal 2 (Frontend):**

```sh
npm run dev
```

## Features

- CV upload and processing
- AI-powered experience extraction
- Automatic evaluation against control interno requirements
- Postgraduate relevance scoring
- Multi-candidate batch processing

## Tech Stack

**Frontend:**

- React + TypeScript
- Vite
- TailwindCSS
- shadcn/ui components

**Backend:**

- Node.js + Express
- TypeScript
- Google Gemini AI API
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0ce6d8b7-af69-4f09-9933-c12011fc2e83) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
