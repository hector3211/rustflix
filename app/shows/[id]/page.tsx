import ActorCaoursel from "@/app/components/Actorcaoursel";
import AddButton from "@/app/components/Addbutton";
import { getSelectedShow, getShowStars } from "@/app/lib/movieActions";
import { currentUser } from "@clerk/nextjs";

async function routeData(id: number) {
  try {
    const show = await getSelectedShow(id);
    const actors = await getShowStars(id);
    return {
      show,
      actors,
    };
  } catch (err) {
    throw new Error(`Failed to get show Data from Api`);
  }
}

export default async function Page({ params }: { params: { id: number } }) {
  const postImg = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces`;
  const user = await currentUser();
  const { show, actors } = await routeData(params.id);
  return (
    <div className="flex flex-col">
      <img
        src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${show?.backdrop_path}`}
        alt={`Poster for movie`}
        className="w-screen object-cover object-top sm:h-[400px] lg:h-[500px]"
      />
      <div className="bg-neutral flex items-center px-2 py-10 text-sm md:text-lg lg:items-center lg:pb-5">
        <img
          src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${show?.poster_path}`}
          alt={` poster for movie ${show?.original_name}`}
          className="w-1/3 rounded-md md:w-1/5"
        />
        <div className="flex w-full  sm:p-8 md:justify-start lg:ml-10 lg:mt-5 lg:w-1/3 lg:text-2xl">
          <div className="flex flex-col">
            <p className="">Title</p>
            <p className="">Rating</p>
            <p className="">Seasons</p>
            <p className="">Episodes</p>
            <p className="">Genre</p>
            <p className="">Released</p>
            <p className="">language</p>
          </div>
          <div className="ml-8 flex w-3/4 flex-col">
            <p>{show?.name}</p>
            <p>{show?.vote_average.toFixed(1)}</p>
            <p>{show?.number_of_seasons}</p>
            <p>{show?.number_of_episodes}</p>
            <div className="flex flex-wrap">
              {show?.genres.map((genre, idx) => (
                <p key={idx} className="px-1">
                  {genre.name}
                </p>
              ))}
            </div>
            <p>{show?.first_air_date}</p>
            <p>{show?.original_language}</p>
          </div>
          <AddButton
            videoType={"SHOW"}
            title={show?.name}
            movieId={show?.id}
            imgUrl={`${postImg}${show?.backdrop_path}`}
            userId={user?.id}
          />
        </div>
      </div>
      <div className="mb-5">
        <ActorCaoursel actors={actors?.cast} type={"shows"} />
      </div>
    </div>
  );
}
