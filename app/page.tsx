import {
  RecentTrack,
  RecentTrackSkeleton,
} from '@/components/lastfm/recent-track';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-lime-800">
      <Suspense fallback={<RecentTrackSkeleton />}>
        <RecentTrack />
      </Suspense>
    </main>
  );
}
