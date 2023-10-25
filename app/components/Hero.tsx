import { Movie, TvShow } from "../lib/types";

type HeroProps = {
  // I hate this
  featuredItem: (Movie & TvShow) | undefined;
};

export default function Hero({ featuredItem }: HeroProps) {
  return (
    <div className="relative text-gray-500 dark:text-gray-200">
      <img
        src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${featuredItem?.backdrop_path}`}
        alt={`featured Poster`}
        className="object-top sm:h-[400px] lg:h-fit lg:w-full"
      />
      <div className=" max-h-[20rem] bg-gray-600 p-5 text-gray-300 shadow-lg shadow-white/50 backdrop-blur-3xl dark:bg-transparent dark:text-gray-300 lg:absolute lg:left-5 lg:top-1/2 lg:max-w-[500px] lg:rounded-lg dark:lg:bg-zinc-950/90">
        <div className="flex items-center space-x-1 py-1 text-sm">
          <h2 className="text-sm font-medium">{featuredItem?.title}</h2>
          <h2 className="text-sm font-medium">{featuredItem?.name}</h2>
          <p>⭐{featuredItem?.vote_average?.toFixed(1)}</p>
        </div>
        <p className="lg:text-md text-justify text-xs ">
          {featuredItem?.overview}
        </p>
      </div>
    </div>
  );
}
