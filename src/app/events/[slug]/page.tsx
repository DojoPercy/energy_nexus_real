'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { urlFor } from '@/sanity/lib/image';
import { PortableTextComponent } from '@/sanity/lib/portableText';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { getEventBySlug } from '@/sanity/lib/queries';
import SaveButton from '@/components/SaveButton'
import { Montserrat } from 'next/font/google';

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  type: string;
  start: string;
  end?: string;
  location?: string;
  region?: {
    _id: string;
    title: string;
    slug: string;
  };
  partners?: Array<{
    _id: string;
    name: string;
    logo?: any;
    website?: string;
  }>;
  description?: any;
  hero?: {
    image?: any;
    caption?: string;
    credit?: string;
  };
  registrationUrl?: string;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: any;
    noindex?: boolean;
  };
}

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400','600','700','800'] });

export default function EventPage() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number; totalMs: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      // Handle slug parameter - it might be a string or array
      const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
      
      if (!slug) return;

      try {
        setLoading(true);
        const eventData = await client.fetch(getEventBySlug, {
          slug: slug
        });

        if (!eventData) {
          setError('Event not found');
          return;
        }

        setEvent(eventData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.slug]);

  useEffect(() => {
    if (!event?.start) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(event.start).getTime();
      const totalMs = Math.max(0, target - now);

      const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, totalMs });
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(intervalId);
  }, [event?.start]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The event you are looking for does not exist.'}</p>
          <Link href="/events" className="bg-brand-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const formatEventDate = (startDate: string, endDate?: string): string => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    const startFormatted = start.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    if (!end || start.toDateString() === end.toDateString()) {
      return startFormatted;
    }

    const endFormatted = end.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `${startFormatted} - ${endFormatted}`;
  };

  const formatEventTime = (startDate: string, endDate?: string): string => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    const startTime = start.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    if (!end) {
      return startTime;
    }

    const endTime = end.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return `${startTime} - ${endTime}`;
  };

  const isEventUpcoming = (): boolean => {
    return new Date(event.start) > new Date();
  };

  const getDaysUntilEvent = (): number => {
    const today = new Date();
    const eventDate = new Date(event.start);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const buildICS = (): string => {
    const dtStart = new Date(event.start);
    const dtEnd = event.end ? new Date(event.end) : new Date(new Date(event.start).getTime() + 60 * 60 * 1000);

    const toICSDate = (d: Date) => {
      const pad = (n: number) => String(n).padStart(2, '0');
      const yyyy = d.getUTCFullYear();
      const mm = pad(d.getUTCMonth() + 1);
      const dd = pad(d.getUTCDate());
      const hh = pad(d.getUTCHours());
      const mi = pad(d.getUTCMinutes());
      const ss = pad(d.getUTCSeconds());
      return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
    };

    const summary = event.title.replace(/\n/g, ' ');
    const description = (event.description ? 'See event details on Energy Nexus' : '').replace(/\n/g, ' ');
    const location = event.location ? event.location.replace(/\n/g, ' ') : '';

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Energy Nexus//Event//EN',
      'BEGIN:VEVENT',
      `UID:${event._id}@energy-nexus`,
      `DTSTAMP:${toICSDate(new Date())}`,
      `DTSTART:${toICSDate(dtStart)}`,
      `DTEND:${toICSDate(dtEnd)}`,
      `SUMMARY:${summary}`,
      location ? `LOCATION:${location}` : '',
      description ? `DESCRIPTION:${description}` : '',
      'END:VEVENT',
      'END:VCALENDAR'
    ].filter(Boolean).join('\r\n');
  };

  const handleDownloadICS = () => {
    try {
      const ics = buildICS();
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${event.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-event.ics`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      // no-op
    }
  };

  const shareLinks = {
    linkedin: (url: string, title: string) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    x: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    email: (url: string, title: string) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(title + '\n' + url)}`,
  } as const;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const pad2 = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="min-h-screen bg-white">
      {/* Full-bleed Hero */}
      {event.hero?.image && (
        <section className={`relative w-full h-[80svh] mb-6 flex items-center justify-center ${montserrat.className}`}>
          <Image
            src={urlFor(event.hero.image).url()}
            alt={event.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,71,171,0.45),rgba(0,71,171,0.55))]" />

          {/* Centered Title and Countdown */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
            <p className="mb-3 text-white/80 text-xs uppercase tracking-wide">Countdown to</p>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
              {event.title}
            </h1>
            {isEventUpcoming() && (
              <div className="mt-8 grid grid-cols-2 sm:grid-flow-col sm:auto-cols-max justify-center gap-3 sm:gap-6" aria-live="polite">
                <div className="min-w-[72px] sm:min-w-[96px] md:min-w-[112px] rounded-xl bg-white/10 ring-1 ring-white/20 px-3 py-2 sm:px-4 sm:py-3 text-center backdrop-blur-sm">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tabular-nums text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">{timeLeft.days}</div>
                  <div className="text-[11px] sm:text-sm uppercase tracking-wider text-white/85">Days</div>
                </div>
                <div className="min-w-[72px] sm:min-w-[96px] md:min-w-[112px] rounded-xl bg-white/10 ring-1 ring-white/20 px-3 py-2 sm:px-4 sm:py-3 text-center backdrop-blur-sm">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tabular-nums text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">{String(timeLeft.hours).padStart(2,'0')}</div>
                  <div className="text-[11px] sm:text-sm uppercase tracking-wider text-white/85">Hours</div>
                </div>
                <div className="min-w-[72px] sm:min-w-[96px] md:min-w-[112px] rounded-xl bg-white/10 ring-1 ring-white/20 px-3 py-2 sm:px-4 sm:py-3 text-center backdrop-blur-sm">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tabular-nums text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">{String(timeLeft.minutes).padStart(2,'0')}</div>
                  <div className="text-[11px] sm:text-sm uppercase tracking-wider text-white/85">Minutes</div>
                </div>
                <div className="min-w-[72px] sm:min-w-[96px] md:min-w-[112px] rounded-xl bg-white/10 ring-1 ring-white/20 px-3 py-2 sm:px-4 sm:py-3 text-center backdrop-blur-sm motion-safe:transition motion-safe:duration-300">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tabular-nums text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">{String(timeLeft.seconds).padStart(2,'0')}</div>
                  <div className="text-[11px] sm:text-sm uppercase tracking-wider text-white/85">Seconds</div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Center Actions */}
          <div className="pointer-events-none absolute inset-x-0 bottom-10 flex items-center justify-center">
            <div className="pointer-events-auto flex flex-col items-center gap-2">
              <a
                href={event.registrationUrl ? event.registrationUrl : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center  bg-white text-brand-blue px-16 py-3 text-sm font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Register Now
              </a>
              {event.location && (
                <p className="text-white/90 text-sm font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">{event.location}</p>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-brand-blue transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/events" className="hover:text-brand-blue transition-colors duration-200">
                Events
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{event.title}</li>
          </ol>
        </nav>

        {/* Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {/* Key Details */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Date</h3>
                <p className="text-gray-700">{formatEventDate(event.start, event.end)}</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Time</h3>
                <p className="text-gray-700">{formatEventTime(event.start, event.end)}</p>
              </div>
             
             
            </div>

        {/* Event Description */}
        {event.description && (
              <article className="prose prose-lg max-w-none mb-10">
            <PortableTextComponent value={event.description} />
          </article>
        )}

        {/* Partners */}
        {event.partners && event.partners.length > 0 && (
              <div className="pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Partners</h3>
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center">
              {event.partners.map((partner) => (
                      <div key={partner._id} className="flex flex-col items-center text-center">
                  {partner.logo ? (
                      <Image
                        src={urlFor(partner.logo).url()}
                        alt={partner.name}
                            width={140}
                        height={80}
                            className="object-contain grayscale hover:grayscale-0 transition"
                        unoptimized
                      />
                  ) : (
                          <div className="h-20 w-full bg-gray-100 flex items-center justify-center rounded">
                      <span className="text-gray-400 text-sm">No logo</span>
                    </div>
                  )}
                        <h4 className="mt-2 text-sm font-medium text-gray-900">{partner.name}</h4>
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                            className="text-brand-blue hover:text-blue-700 text-xs"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-lg border border-gray-200 p-5 shadow-sm">
                <div className="space-y-3">
                  {event.registrationUrl && (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center rounded-md bg-brand-blue px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                    >
                      Register Now
                    </a>
                  )}
                  <SaveButton contentId={event._id} />
                  <button
                    type="button"
                    onClick={handleDownloadICS}
                    className="w-full inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Add to Calendar (ICS)
                  </button>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-2">Share</p>
                  <div className="flex items-center gap-3">
                    <a aria-label="Share on LinkedIn" href={isClient ? shareLinks.linkedin(currentUrl, event.title) : '#'} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.06c.62-1.18 2.14-2.43 4.41-2.43C21.5 7.77 24 10.1 24 14.55V24h-5v-8.18c0-1.95-.03-4.45-2.71-4.45-2.71 0-3.13 2.12-3.13 4.31V24H7.5V8z"/></svg>
                    </a>
                    <a aria-label="Share on X" href={isClient ? shareLinks.x(currentUrl, event.title) : '#'} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.56 7.5L22 22h-5.906l-4.62-6.02L5.96 22H3.2l7.06-8.07L2 2h5.988l4.18 5.6L18.244 2zm-2.07 18h1.56L7.94 4h-1.6l9.834 16z"/></svg>
                    </a>
                    <a aria-label="Share via Email" href={isClient ? shareLinks.email(currentUrl, event.title) : '#'} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v.4l10 6.25L22 6.4V6a2 2 0 0 0-2-2zm0 4.25-8 5-8-5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.25z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Back to Events */}
        <div className="border-t border-gray-200 pt-8">
          <Link
            href="/events"
            className="inline-flex items-center space-x-2 text-brand-blue hover:text-blue-700 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Events</span>
          </Link>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      {event.registrationUrl && isEventUpcoming() && (
        <div className="fixed bottom-0 inset-x-0 z-30 border-t border-gray-200 bg-white/95 backdrop-blur px-4 py-3 sm:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm">
              <p className="font-semibold text-gray-900">Starting soon</p>
              <p className="text-gray-600 tabular-nums">{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</p>
            </div>
            <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white">
              Register
            </a>
          </div>
        </div>
      )}
    </div>
  );
}