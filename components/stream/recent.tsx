'use server';
import { StreamPhoto } from '@/interfaces';
import { fetchStream } from '@/lib/fetch-stream';
import { groupByWeek } from '@/lib/helpers';
import Image from 'next/image';

export const RecentStream = async () => {
  const allPhotos: StreamPhoto[] = await fetchStream();

  const groupedPhotos = groupByWeek(allPhotos);

  return (
    <div className="my-32">
      {groupedPhotos.map(({ week, weekBegins, posts }) => {
        return (
          <div key={week}>
            <h1 className="text-4xl md:text-2xl lg:text-4xl mt-6 mb-3 mix-blend-overlay text-white">
              <abbr
                className="no-underline"
                title={`Week beginning ${weekBegins.toDateString()}`}
              >
                Week {week}
              </abbr>
            </h1>
            <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 md:gap-6">
              {posts.map(({ id, cloudflareId }) => (
                <Image
                  key={id}
                  alt=""
                  id={`image-${id}`}
                  src={`https://imagedelivery.net/tfgleCjJafHVtd2F4ngDnQ/${cloudflareId}/stream`}
                  width={320}
                  height={480}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
