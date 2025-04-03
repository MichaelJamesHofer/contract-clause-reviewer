# Contract Clause Reviewer

A lightweight web application that allows users to input contract clauses, select a review type, and receive AI-powered feedback using OpenAI's GPT-4 model, Claude, and Perplexity.

## Features

- Input contract clauses for review
- Select from multiple review types:
  - Review for risks
  - Suggest improvements
  - Check for completeness
  - Simplify language
  - Identify ambiguities
- Receive AI-powered analysis and feedback
- Secure authentication
- Responsive design for all devices

## Tech Stack

- **Frontend/Backend:** Next.js (TypeScript)
- **AI Integration:** OpenAI API (GPT-4), Claude API, Perplexity API
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **Deployment:** Vercel

## Getting Started

1. Clone the repository
2. Install dependencies with \
pm install\
3. Create a \.env.local\ file with the following variables:
   `
   OPENAI_API_KEY=your_openai_api_key
   CLAUDE_API_KEY=your_claude_api_key
   PERPLEXITY_API_KEY=your_perplexity_api_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   `
4. Run the development server with \
pm run dev\
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

See [ARCHITECTURE_RULES.md](./ARCHITECTURE_RULES.md) for detailed information about the project structure and coding standards.

## Development Plan

See [TASKMASTER_PLAN.md](./TASKMASTER_PLAN.md) for the detailed development plan and task breakdown.

## License

MIT
