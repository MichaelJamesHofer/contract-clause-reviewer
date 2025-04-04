# Contract Clause Reviewer

A powerful tool for analyzing contract clauses using multiple AI providers.

## Features

- Multiple AI providers support (OpenAI GPT-4, Anthropic Claude, Perplexity)
- Different types of contract clause analysis:
  - Risk Assessment
  - Improvement Suggestions
  - Completeness Check
  - Language Simplification
  - Ambiguity Detection
- Automatic fallback between providers
- Review history tracking
- Modern, responsive UI

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your API keys:
   ```
   OPENAI_API_KEY=your_openai_key
   ANTHROPIC_API_KEY=your_anthropic_key
   PERPLEXITY_API_KEY=your_perplexity_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Architecture

The application uses a service-based architecture for AI providers:

- `BaseAIService`: Abstract base class with common functionality
- Provider-specific implementations:
  - `OpenAIService`: GPT-4 integration
  - `ClaudeService`: Claude integration
  - `PerplexityService`: Perplexity AI integration
- `AIServiceManager`: Handles provider selection and fallback

## Error Handling

The system includes robust error handling:
- Rate limiting with token bucket algorithm
- Automatic retries with exponential backoff
- Graceful fallback between providers
- User-friendly error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
