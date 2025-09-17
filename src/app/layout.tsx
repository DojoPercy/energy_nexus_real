import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroAds from "@/components/hero-ads";
import {VisualEditing} from 'next-sanity'
import {draftMode} from 'next/headers'
import {DisableDraftMode} from '@/components/DisableDraftMode'
import {SanityLive} from '@/sanity/lib/live'
import { AnalyticsProvider } from '@/components/analytics'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({
  subsets: ['latin'],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Energy Nexus - Latest Energy News, Articles & Insights",
  description: "Stay updated with the latest energy news, articles, interviews, and insights from the energy industry.",
  metadataBase: new URL('https://energynexus.com'),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased flex flex-col relative`}
      >
        <AnalyticsProvider>
          <div className="fixed top-0 left-0 right-0 z-50 ">
            <Header />
          </div>
          <div className="mt-24 flex-1">
            {children}
          </div> 
          <Footer />
          <SanityLive />
          {(await draftMode()).isEnabled && (
            <>
              <VisualEditing />
              <DisableDraftMode />
            </>
          )}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
