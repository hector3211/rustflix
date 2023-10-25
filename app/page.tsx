import Caoursel from "./components/Caoursel";
import {
  getPopularMovies,
  getPopularTvShows,
  getTrendingMovies,
  getTrendingTvShows,
} from "./lib/movieActions";
import { Movie, TvShow } from "./lib/types";
import Hero from "./components/Hero";

async function getAllContent() {
  try {
    const popularMovies = await getPopularMovies();
    const popularTvShows = await getPopularTvShows();
    const trendingMovies = await getTrendingMovies();
    const treandingTvShows = await getTrendingTvShows();
    let featurd;

    if (trendingMovies && treandingTvShows) {
      const items = [
        ...(trendingMovies as Movie[]),
        ...(treandingTvShows as Movie[]),
      ];
      const randomPick = items[Math.floor(Math.random() * items.length)];
      featurd = randomPick;
    }
    return {
      popularMovies,
      popularTvShows,
      trendingMovies,
      treandingTvShows,
      featurd,
    };
  } catch (err) {
    console.log(`Error getting main page data! ERROR: ${err}`);
  }
}

export default async function Home() {
  const data = await getAllContent();
  return (
    <div className="">
      <Hero featuredItem={data?.featurd as Movie & TvShow} />
      <div className="lg:pt-5">
        <h1 className="pl-4 text-sm font-extrabold text-gray-400">
          Popular Movies
        </h1>
        <Caoursel videos={data?.popularMovies as Movie[]} type="movies" />
        <h1 className="pl-4 text-sm font-extrabold text-gray-400">
          Popular Shows
        </h1>
        <Caoursel videos={data?.popularTvShows as Movie[]} type="shows" />
        <h1 className="pl-4 text-sm font-extrabold text-gray-400">
          Trending Movies
        </h1>
        <Caoursel videos={data?.trendingMovies as Movie[]} type="movies" />
        <h1 className="pl-4 text-sm font-extrabold text-gray-400">
          Trending Shows
        </h1>
        <Caoursel videos={data?.treandingTvShows as Movie[]} type="shows" />
      </div>
    </div>
  );
}
