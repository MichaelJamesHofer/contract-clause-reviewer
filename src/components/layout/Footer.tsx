import { IFooterProps } from '@/types/layout';

export default function Footer({ showAttribution = true }: IFooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Contract Clause Reviewer. All rights reserved.
          </div>
          {showAttribution && (
            <div className="text-gray-400 text-sm">
              Powered by{' '}
              <a
                href="https://openai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500"
              >
                OpenAI
              </a>
              {', '}
              <a
                href="https://anthropic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Claude
              </a>
              {' & '}
              <a
                href="https://perplexity.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Perplexity
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
} 