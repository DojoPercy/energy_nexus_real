import HeroAds from '@/components/hero-ads';
import { generateInterviewsMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = generateInterviewsMetadata();

export default function InterviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return  (
    <>
     <HeroAds />
     {children}
    </>
  );
}
