import Caoursel from "@/app/components/Caoursel";
import { getActorInfo, getActorsPastMovies } from "@/app/lib/movieActions";
import { Movie, TvShow, VideoType } from "@/app/lib/types";

async function routeData(actorId: number) {
  try {
    const pastMovie = await getActorsPastMovies(actorId);
    if (!pastMovie) {
      return;
    }

    const actorInfo = await getActorInfo(actorId);
    if (!actorInfo) {
      return;
    }

    return {
      pastMovie,
      actorInfo,
    };
  } catch (err) {
    throw new Error(`Failed to get actor's movies`);
  }
}

export default async function Page({
  params,
}: {
  params: { id: number; type: VideoType };
}) {
  const data = await routeData(params.id);
  return (
    <div className="flex flex-col py-8 pt-4">
      <div className="flex justify-around">
        <img
          src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${data?.actorInfo?.profile_path}`}
          alt={` poster for star ${data?.actorInfo?.name}`}
          className="w-80 rounded-md object-cover object-top md:h-fit"
        />
        <div className="flex flex-col items-start justify-center">
          <div className="flex w-full space-x-3">
            <p>Name:</p>
            <p>{data?.actorInfo?.name}</p>
          </div>
          <div className="flex w-full space-x-3">
            <p>Birthday:</p>
            <p>{data?.actorInfo?.birthday}</p>
          </div>
          <div className="flex w-full space-x-3">
            <p>Place Of Birth:</p>
            <p>{data?.actorInfo?.place_of_birth}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Caoursel
          videos={data?.pastMovie?.cast as Movie[] | TvShow[]}
          type={params.type}
        />
      </div>
    </div>
  );
}
