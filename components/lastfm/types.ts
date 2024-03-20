export type LastFmImage = {
  size: 'small' | 'medium' | 'large' | 'extralarge';
  '#text': string;
};

export type LastFmPayload = {
  artist: {
    mbid: string;
    '#text': string;
  };
  date?: {
    uts: string;
    '#text': string;
  };
  mbid: string;
  name: string;
  image: LastFmImage[];
  url: string;
  streamable: string;
  album: {
    mbid: string;
    '#text': string;
  };
  '@attr'?: {
    nowplaying: string;
  };
};

export type Track = {
  album: string;
  artist: string;
  date?: string;
  image: LastFmImage[];
  name: string;
};

export type ListeningData = {
  track: Track;
  nowPlaying: boolean;
  total: number;
};
