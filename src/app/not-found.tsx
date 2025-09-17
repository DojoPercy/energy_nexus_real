import { Metadata } from 'next';
import Link from 'next/link';
import { generateNotFoundMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateNotFoundMetadata();

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-brand-blue mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for could not be found. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-brand-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Homepage
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Or try one of these popular pages:</p>
            <div className="mt-2 space-x-4">
              <Link href="/articles" className="text-brand-blue hover:underline">
                Articles
              </Link>
              <Link href="/interviews" className="text-brand-blue hover:underline">
                Interviews
              </Link>
              <Link href="/events" className="text-brand-blue hover:underline">
                Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
