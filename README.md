# AI TestPilot

AI-powered test case generation and failure analysis, built with Next.js and Google Gemini. Describe a feature or requirement, and TestPilot generates structured test cases for you. When a test fails, it helps you understand why.

## Features

- **AI test case generation**: turn a plain-English feature description into structured, ready-to-use test cases
- **Failure analysis**: paste a failing test or error and get a likely root cause with suggested fixes
- **Workspace**: a focused page for writing prompts and reviewing generated results
- **Dashboard**: an overview of your generated test cases
- **Input and output validation**: requests and AI responses are validated before they reach you, so malformed output is caught early

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router) and React
- Google Gemini API for generation and analysis
- Next.js API routes (Node.js runtime)
- Tailwind CSS (PostCSS)
- ESLint

## Project Structure

```
app/
  api/
    test-cases/        # POST: generate test cases from a prompt
    analyze-failure/   # POST: analyze a failing test
  dashboard/           # Dashboard page
  workspace/           # Workspace page
components/            # Reusable UI components
lib/
  gemini.js            # Gemini API client
  prompts.js           # Prompt builders
  validation.js        # Request and response validation
public/                # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### Installation

```bash
git clone https://github.com/awais4212/AI-TestPilot.git
cd AI-TestPilot
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

Never commit this file. It is already listed in `.gitignore`.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Reference

### `POST /api/test-cases`

Generates test cases from a feature description.

**Request**

```json
{
  "description": "User login with email and password"
}
```

**Response**

```json
{
  "testCases": [
    {
      "title": "...",
      "steps": ["..."],
      "expectedResult": "..."
    }
  ]
}
```

Invalid input returns `400` with an `error` message.

### `POST /api/analyze-failure`

Analyzes a failing test and suggests a cause and fix.

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Run the production build     |
| `npm run lint`  | Run ESLint                   |

## Deployment

The easiest way to deploy is [Vercel](https://vercel.com/). Import the repo and add `GEMINI_API_KEY` under **Project Settings → Environment Variables**.

## Contributing

Contributions are welcome. Fork the repo, create a feature branch, and open a pull request.

## Author

**Syed Muhammad Awais Hashmi**: [@awais4212](https://github.com/awais4212)
