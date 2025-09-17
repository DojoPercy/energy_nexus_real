import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { urlFor } from '@/sanity/lib/image';
import { PortableTextComponent } from '@/sanity/lib/portableText';
import Image from 'next/image';
import Link from 'next/link';
import SidebarAd from '@/components/SidebarAd';
import ContentRecommendations from '@/components/ContentRecommendations';
import RelatedContent from '@/components/RelatedContent';
import ContentEngagementTracker from '@/components/ContentEngagementTracker';
import SocialShareButton, { SocialShareBar } from '@/components/SocialShareButton';
import SummarizeButton from '@/components/SummarizeButton';
import { getInterviewUrl } from '@/lib/urls';
import { getInterviewBySlug } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { generateInterviewMetadata } from '@/lib/metadata';
import { CalendarIcon, ClockIcon, UserIcon, TagIcon, ArrowLeftIcon, BookOpenIcon, MapPinIcon, BuildingIcon, ExternalLinkIcon } from 'lucide-react';

interface Interview {
  _id: string;
  title: string;
  slug: { current: string };
  dek?: string;
  publishedAt?: string;
  updatedAt?: string;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: any;
    noindex?: boolean;
  };
  hero?: {
    image?: any;
    caption?: string;
    credit?: string;
  };
  interviewee?: {
    _id: string;
    name: string;
    headshot?: any;
    role?: string;
    bio?: string;
    organization?: {
      _id: string;
      name: string;
      logo?: any;
    };
    socials?: {
      linkedin?: string
      x?: string
      website?: string
    };
  };
  roleAtTime?: string;
  organizationAtTime?: {
    _id: string;
    name: string;
    logo?: any;
  };
  sectors?: Array<{
    _id: string;
    title: string;
    slug: string;
  }>;
  regions?: Array<{
    _id: string;
    title: string;
    slug: string;
  }>;
  tags?: Array<{
    _id: string;
    title: string;
    slug: string;
  }>;
  transcript?: any;
  year?: number;
  pullQuotes?: string[];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const interview = await client.fetch(getInterviewBySlug, {
    slug
  });

  if (!interview) {
    return {
      title: 'Interview Not Found',
      description: 'The interview you are looking for does not exist.',
    };
  }

  return generateInterviewMetadata(interview);
}

export default async function InterviewPage({ params }: Props) {
  const { slug } = await params;
  const interview = await client.fetch(getInterviewBySlug, {
    slug
  });
  if (!interview) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Track content engagement */}
      <ContentEngagementTracker
        contentId={interview._id}
        contentType="interview"
        enabled={true}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link 
                href="/" 
                className="text-gray-500 hover:text-brand-blue transition-colors duration-200 font-medium"
              >
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link 
                href="/interviews" 
                className="text-gray-500 hover:text-brand-blue transition-colors duration-200 font-medium"
              >
                Interviews
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium truncate max-w-xs lg:max-w-md">
              {interview.interviewee?.name || interview.title}
            </li>
          </ol>
        </nav>

        {/* Interview Header */}
        <header className="mb-12">
          {/* Category and Meta Information */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              {interview.regions?.[0] && (
                <span className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-sm font-semibold">
                  <MapPinIcon className="w-4 h-4" />
                  {interview.regions[0].title}
                </span>
              )}
              {interview.sectors?.[0] && (
                <span className="inline-flex items-center gap-2 bg-emerald-green/10 text-emerald-green px-3 py-1 rounded-full text-sm font-semibold">
                  <BuildingIcon className="w-4 h-4" />
                  {interview.sectors[0].title}
                </span>
              )}
              {interview.year && (
                <span className="inline-flex items-center gap-1 text-gray-500 text-sm">
                  <CalendarIcon className="w-4 h-4" />
                  {interview.year}
                </span>
              )}
            </div>
            
            {/* Publication Date */}
            {interview.publishedAt && (
              <time className="inline-flex items-center gap-1 text-gray-500 text-sm">
                <ClockIcon className="w-4 h-4" />
                {new Date(interview.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
          </div>

          {/* Interviewee Profile Section */}
          <div className="bg-white rounded-2xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Headshot */}
              {interview.interviewee?.headshot && (
                <div className="lg:w-1/3 flex justify-center lg:justify-start">
                  <div className="relative">
                    <Image
                      src={urlFor(interview.interviewee.headshot).url()}
                      alt={interview.interviewee.name}
                      width={280}
                      height={280}
                      className=" object-cover w-full max-w-sm shadow-lg"
                    />
                    {/* Organization Logo Overlay */}
                    {(interview.organizationAtTime?.logo || interview.interviewee?.organization?.logo) && (
                      <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-lg shadow-lg">
                        <Image
                          src={urlFor(interview.organizationAtTime?.logo || interview.interviewee?.organization?.logo).url()}
                          alt="Organization Logo"
                          width={48}
                          height={48}
                          className="rounded object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Interviewee Info */}
              <div className="lg:w-2/3">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight poppins-bold">
                  {interview.interviewee?.name || interview.title}
                </h1>
                
                {/* Role and Organization */}
                <div className="mb-6">
                  <p className="text-xl md:text-2xl font-semibold text-brand-blue mb-2">
                    {interview.roleAtTime || interview.interviewee?.role}
                  </p>
                  {(interview.organizationAtTime?.name || interview.interviewee?.organization?.name) && (
                    <p className="text-lg text-gray-600 font-medium">
                      {interview.organizationAtTime?.name || interview.interviewee?.organization?.name}
                    </p>
                  )}
                </div>

                {/* Bio */}
                {interview.interviewee?.bio && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <UserIcon className="w-5 h-5" />
                      Biography
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {interview.interviewee.bio}
                    </p>
                  </div>
                )}

                {/* Social Links */}
                {interview.interviewee?.socials && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <ExternalLinkIcon className="w-5 h-5" />
                      Connect
                    </h3>
                    <div className="flex items-center gap-4">
                      {interview.interviewee.socials.linkedin && (
                        <Link 
                          href={interview.interviewee.socials.linkedin} 
                          target="_blank" 
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          aria-label="LinkedIn"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                            <rect width="4" height="12" x="2" y="9"/>
                            <circle cx="4" cy="4" r="2"/>
                          </svg>
                          LinkedIn
                        </Link>
                      )}
                      {interview.interviewee.socials.x && (
                        <Link 
                          href={interview.interviewee.socials.x} 
                          target="_blank" 
                          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                          aria-label="X (Twitter)"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"/>
                            <path d="m6 6 12 12"/>
                          </svg>
                          X
                        </Link>
                      )}
                      {interview.interviewee.socials.website && (
                        <Link 
                          href={interview.interviewee.socials.website} 
                          target="_blank" 
                          className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-vibrant-blue transition-colors duration-200"
                          aria-label="Website"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M2 12h20"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                          </svg>
                          Website
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                {/* Author Information */}
                {interview.authors?.[0] && (
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center gap-3">
                      {interview.authors[0].headshot && (
                        <Image
                          src={urlFor(interview.authors[0].headshot).url()}
                          alt={interview.authors[0].name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover border-2 border-gray-200"
                        />
                      )}
                      <div>
                        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                          Interview by
                        </span>
                        <p className="font-semibold text-gray-900">
                          {interview.authors[0].name}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-6">
                  <SocialShareButton
                    url={getInterviewUrl(interview.slug.current)}
                    title={interview.interviewee?.name || interview.title}
                    description={interview.dek}
                    hashtags={[...(interview.sectors?.map((s: any) => s.title) || []), ...(interview.regions?.map((r: any) => r.title) || [])]}
                    variant="compact"
                  />
                  <SummarizeButton
                    contentType="interview"
                    slug={interview.slug.current}
                    contentId={interview._id}
                    variant="compact"
                  />
                </div>
              </div>
            </div>
          </div>

            

          {/* Pull Quote */}
          {interview.pullQuotes && interview.pullQuotes[0] && (
            <div className="bg-brand-blue/5 border-l-4 border-brand-blue p-8 mb-8 rounded-r-2xl">
              <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed italic">
                "{interview.pullQuotes[0]}"
              </blockquote>
            </div>
          )}

          {/* Deck */}
          {interview.dek && (
            <div className="mb-8">
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                {interview.dek}
              </p>
            </div>
          )}
        </header>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Interview Transcript */}
            {interview.transcript && (
              <article className="prose prose-lg prose-gray max-w-none mb-12">
                <PortableTextComponent value={interview.transcript} />
              </article>
            )}

            {/* Tags */}
            {interview.tags && interview.tags.length > 0 && (
              <div className="border-t border-gray-200 pt-8 mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <TagIcon className="w-5 h-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {interview.tags.map((tag: { _id: string; title: string; slug: string }) => (
                    <span
                      key={tag._id}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer"
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <SidebarAd 
                className="mb-6"
                maxAds={2}
                showAdLabel={true}
                showControls={false}
                showIndicators={true}
                autoRotate={true}
                rotationInterval={6000}
              />
            </div>
          </div>
        </div>

        {/* Social Share Bar */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          <SocialShareBar
            url={getInterviewUrl(interview.slug.current)}
            title={interview.interviewee?.name || interview.title}
            description={interview.dek}
            hashtags={[...(interview.sectors?.map((s: any) => s.title) || []), ...(interview.regions?.map((r: any) => r.title) || [])]}
            className="justify-center"
          />
        </div>

        {/* Back to Interviews */}
        <div className="mb-12">
          <Link
            href="/interviews"
            className="inline-flex items-center gap-2 text-brand-blue hover:text-vibrant-blue transition-colors duration-200 font-medium"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Interviews</span>
          </Link>
        </div>

        {/* Smart Content Recommendations */}
        <div className="border-t border-gray-200 pt-12 mb-12">
          <ContentRecommendations
            currentContent={interview}
            title="You Might Also Like"
            maxItems={6}
          />
        </div>

        {/* Related Content */}
        <div className="mb-12">
          <RelatedContent
            currentContent={interview}
            title="Related Interviews & Articles"
            maxItems={4}
            showSections={true}
          />
        </div>
      </div>
    </div>
  );
}

