'use server';

import Image from 'next/image';
import { ListeningData, LastFmPayload, Track } from './types';
import Link from 'next/link';

function formatData(track: LastFmPayload): Track {
  return {
    album: track.album['#text'],
    artist: track.artist['#text'],
    image: track.image,
    name: track.name,
    date: track?.date?.['#text'],
  };
}

async function fetchListeningData(): Promise<ListeningData> {
  const response = await fetch(
    'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=jonheslop&api_key=91a252d1326d4ba3be6a291b7b0b90ff&format=json&limit=1',
    { next: { revalidate: 0, tags: ['lastfm'] } }
  );

  const { recenttracks } = await response.json();

  return {
    track: formatData(recenttracks.track[0]),
    nowPlaying: recenttracks.track.length === 2,
    total: parseInt(recenttracks['@attr'].total),
  };
}

export const RecentTrack = async () => {
  const { track, nowPlaying, total } = await fetchListeningData();

  return (
    <div className="flex gap-3 bg-lime-900 p-3 text-neutral-200 w-full max-w-sm">
      <Image
        src={track.image[3]['#text']}
        width={128}
        height={128}
        alt={track.album}
        className="border-2 border-white"
      />
      <div className="flex flex-col">
        <h4 className="uppercase text-xs tracking-widest mb-2">
          {nowPlaying ? 'Now playing' : 'Recently listened'}
        </h4>
        <strong className="font-normal text-xl text-balance">
          {track.name}
        </strong>
        <span className="text-balance text-xs">by {track.artist}</span>
        <span className="text-xs mt-auto">
          {new Intl.NumberFormat('en-GB').format(total)}{' '}
          <Link
            href="https://www.last.fm/user/jonheslop"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            title="My full listening history is recorded on Last.fm"
          >
            scrobbles since 2007
          </Link>
        </span>
      </div>
    </div>
  );
};

export const RecentTrackSkeleton = () => (
  <div className="flex gap-4 bg-neutral-100/80 p-4 text-neutral-900 w-full max-w-sm">
    <div className="bg-neutral-400/50 rounded-lg size-32 animate-pulse" />
    <div className="flex flex-col gap-2">
      <h4 className="uppercase text-xs tracking-widest mb-2">Loading...</h4>
      <div className="w-32 h-4 bg-neutral-400/50 rounded-full animate-pulse" />
      <div className="w-40 h-4 bg-neutral-400/50 rounded-full animate-pulse" />
      <div className="w-24 h-3 bg-neutral-400/50 rounded-full animate-pulse mt-auto" />
    </div>
  </div>
);
