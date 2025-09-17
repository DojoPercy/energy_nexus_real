'use client'
import { Metadata } from 'next';
import { generateErrorMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateErrorMetadata();

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Something went wrong!</h2>
              <p className="text-gray-600 mb-8">
                We're sorry, but something went wrong on our end. Please try again later.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={reset}
                className="inline-block bg-brand-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Try again
              </button>
              
              <div className="text-sm text-gray-500">
                <p>If the problem persists, please contact our support team.</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
