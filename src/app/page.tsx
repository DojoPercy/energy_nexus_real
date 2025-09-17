import { auth0 } from "@/lib/auth0";
import Header from "@/components/Header";
import MainHero from "@/components/main_hero";
import HeroAds from "@/components/hero-ads";
import LatestArticles from "@/components/latest-articles";
import FeaturedInterviews from "@/components/featured-interviews";
import RecentEvents from "@/components/recent_events";
import LatestPublications from "@/components/latest-publications";
import SpecialReportsRail from "@/components/special-reports-rail";
import './globals.css';
import { generateHomeMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import MemberExclusives from "@/components/MemberExclusives";

export const metadata: Metadata = generateHomeMetadata();

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  return (
    <div className="min-h-screen bg-white">
    
      
            <HeroAds />
      <MainHero />
                      <LatestArticles />
                <FeaturedInterviews />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <SpecialReportsRail />
                </div>
                <LatestPublications />
                <MemberExclusives maxItems={3} className="mt-16"/>
                <RecentEvents />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      </main>
    </div>
  );
}