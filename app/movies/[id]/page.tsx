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
        alt={`Poster for movie`}
        className="w-screen object-cover object-top sm:h-[400px] lg:h-[500px]"
      />
      <div className="flex flex-col-reverse items-center space-y-5 py-8 md:flex-row-reverse md:justify-start md:px-5 md:py-10 md:text-lg lg:pb-5">
        <AddButton
          videoType={"MOVIE"}
          title={movie?.title}
          movieId={movie?.id}
          imgUrl={`${postImg}${movie?.backdrop_path}`}
          userId={user?.id}
        />
        <div className="flex items-center justify-center py-5 pl-5 md:w-full md:items-center md:justify-center md:pl-5 lg:w-full lg:text-2xl">
          <div className="flex flex-col space-y-1 font-medium">
            <p>Title</p>
            <p>Rating</p>
            <p>Budget</p>
            <p>Genre</p>
            <p>Released</p>
            <p>language</p>
          </div>
          <div className="ml-8 flex w-3/4 flex-col space-y-1">
            <p>{movie?.title}</p>
            <p>{movie?.vote_average.toFixed(1) || 0}</p>
            <p>
              {movie?.budget.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <div className="flex">
              {movie?.genres.map((genre, idx) => (
                <p key={idx} className="gap-1">
                  {genre.name}
                </p>
              ))}
            </div>
            <p>{movie?.release_date}</p>
            <p>{movie?.original_language}</p>
          </div>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie?.poster_path}`}
          alt={`poster for movie ${movie?.title}`}
          className="w-2/3 rounded-md object-contain md:w-1/2 lg:w-1/4"
        />
      </div>
      <div className="mb-5">
        <ActorCaoursel actors={actors?.cast} type={"movies"} />
      </div>
    </div>
  );
}
