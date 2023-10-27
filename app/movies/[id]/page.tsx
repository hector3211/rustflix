import ActorCaoursel from "@/app/components/Actorcaoursel";
import AddButton from "@/app/components/Addbutton";
import { getMovieStars, getSelectedMovie } from "@/app/lib/movieActions";
import { currentUser } from "@clerk/nextjs";

async function routeData(id: number) {
  try {
    const movie = await getSelectedMovie(id);
    const actors = await getMovieStars(id);
    return {
      movie,
      actors,
    };
  } catch (err) {
    throw new Error(`Failed to get show Data from Api`);
  }
}

export default async function Page({ params }: { params: { id: number } }) {
  const user = await currentUser();
  const { movie, actors } = await routeData(params.id);
  const postImg = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces`;
  return (
    <div className="flex flex-col">
      <img
        src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path}`}
        alt={`Main poster for ${movie?.title}`}
        className="w-screen object-cover object-top sm:h-[400px] lg:h-[500px]"
      />
      <div className="bg-neutral flex items-center px-2 py-10 text-sm md:text-lg lg:items-center lg:pb-5">
        <img
          src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie?.poster_path}`}
          alt={`poster for movie ${movie?.title}`}
          className="w-1/3 rounded-md md:w-1/5"
        />
        <div className="flex w-full  sm:p-8 md:justify-start lg:ml-10 lg:mt-5 lg:w-1/3 lg:text-2xl">
          <div className="flex flex-col">
            <p className="">Title</p>
            <p className="">Rating</p>
            <p className="">Budget</p>
            <p className="">Genre</p>
            <p className="">Released</p>
            <p className="">language</p>
          </div>
          <div className="ml-8 flex w-3/4 flex-col">
            <p>{movie?.title}</p>
            <p>{movie?.vote_average.toFixed(1) || 0}</p>
            <p>
              {movie?.budget.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <div className="flex">
              {movie?.genres.map((genre) => (
                <p className="px-1">{genre.name}</p>
              ))}
            </div>
            <p>{movie?.release_date}</p>
            <p>{movie?.original_language}</p>
          </div>
          <AddButton
            videoType={"MOVIE"}
            title={movie?.title}
            movieId={movie?.id}
            imgUrl={`${postImg}${movie?.backdrop_path}`}
            userId={user?.id}
          />
        </div>
      </div>
      <div className="mb-5">
        <ActorCaoursel actors={actors?.cast} type={"movies"} />
      </div>
    </div>
  );
}
