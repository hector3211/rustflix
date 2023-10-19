import Caoursel from "./components/Caoursel";
import {
    getPopularMovies,
    getPopularTvShows,
    getTrendingMovies,
    getTrendingTvShows,
} from "./lib/movieActions";
import { Movie } from "./lib/types";
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
        <div>
            <Hero featuredItem={data?.featurd} />
            <Caoursel movies={data?.popularMovies as Movie[]} type="movies" />
            <Caoursel movies={data?.popularTvShows as Movie[]} type="shows" />
            <Caoursel movies={data?.trendingMovies as Movie[]} type="movies" />
            <Caoursel movies={data?.treandingTvShows as Movie[]} type="shows" />
        </div>
    );
}
