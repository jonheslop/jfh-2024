import {
  RecentTrack,
  RecentTrackSkeleton,
} from '@/components/lastfm/recent-track';
import { RecentStream } from '@/components/stream/recent';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <>
      <header>
        <h1 className="text-8xl font-bold uppercase fixed z-10 mix-blend-overlay text-neutral-900">
          Jon Heslop
        </h1>
      </header>
      <main className="relative flex min-h-screen flex-col items-center justify-center z-0">
        <Suspense fallback={<RecentTrackSkeleton />}>
          <RecentTrack />
        </Suspense>
        <Suspense fallback={<RecentTrackSkeleton />}>
          <RecentStream />
        </Suspense>
      </main>
    </>
  );
}
