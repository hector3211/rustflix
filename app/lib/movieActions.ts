"use server"

import { revalidateTag } from "next/cache";
import { MovieResponse, Movie, TvShow, Cast, Actor, People } from "./types";

const tmdbKey = process.env.TMDB_KEY;
const TMDB_API_URL = "https://api.themoviedb.org/3";


export async function testMovieActions() {
    const timer = setTimeout(() => {
        console.log("async test!!!\n")
    }, 3000)
    return () => clearTimeout(timer)
}
export async function getPopularMovies(): Promise<
    Movie[] | undefined | Response
> {
    try {
        const res = await fetch(
            `${TMDB_API_URL}/movie/popular?api_key=${tmdbKey}&language=en-US&page=1`,
        );
        const data: MovieResponse = await res.json();
        revalidateTag("popularMovies")
        return data.results;
    } catch (err) {
        // throw new Error("Failed to get movies");
        console.log(`Failed getting popular movies with error: ${err}`);
        return new Response("Oops something went wrong!", { status: 400 });
    }
}

export async function getPopularTvShows(): Promise<
    Movie[] | undefined | Response
> {
    try {
        const res = await fetch(
            `${TMDB_API_URL}/tv/popular?api_key=${tmdbKey}&language=en-US&page=1`,
        );
        const data: MovieResponse = await res.json();
        revalidateTag("popularShows")
        return data.results;
    } catch (err) {
        // throw new Error("Failed to get movies");
        console.log(`Failed getting popular shows with error: ${err}`);
        return new Response("Oops something went wrong!", { status: 400 });
    }
}

export async function getTrendingMovies(): Promise<
    Movie[] | undefined | Response
> {
    try {
        const res = await fetch(
            `${TMDB_API_URL}/trending/movie/day?api_key=${tmdbKey}&language=en-US`,
        );
        const data: MovieResponse = await res.json();
        revalidateTag("trendingMovies")
        return data.results;
    } catch (err) {
        // throw new Error("Failed to get movies");
        console.log(`Failed getting trending movies with error: ${err}`);
        return new Response("Oops something went wrong!", { status: 400 });
    }
}

export async function getTrendingTvShows(): Promise<
    Movie[] | undefined | Response
> {
    try {
        const res = await fetch(
            `${TMDB_API_URL}/trending/tv/day?api_key=${tmdbKey}&language=en-US`,
        );
        const data: MovieResponse = await res.json();
        revalidateTag("trendingShows")
        return data.results;
    } catch (err) {
        // throw new Error("Failed to get movies");
        console.log(`Failed getting trending shows with error: ${err}`);
        return new Response("Oops something went wrong!", { status: 400 });
    }
}

export async function getSelectedShow(
    itemId: number,
): Promise<TvShow | undefined> {
    try {
        const res = await fetch(
            `${TMDB_API_URL}/tv/${itemId}?api_key=${tmdbKey}&language=en-US`,
        );
        const data: TvShow = await res.json();
        return data;
    } catch (err) {
        // throw new Error("Failed to get movies");
        console.log(`Failed getting secected show info with error: ${err}`);
    }
}

export async function getShowStars(
    showId: number,
): Promise<Cast | undefined> {
    try {
        const res = await fetch(
            `${TMDB_API_URL}/tv/${showId}/credits?api_key=${tmdbKey}&language=en-US`,
        );
        const data: Cast = await res.json();
        return data;
    } catch (err) {
        // throw new Error("Failed to get movies");
        console.log(`Failed getting show stars with error: ${err}`);
    }
}

export async function getSelectedMovie(
    movieId: number,
): Promise<Movie | undefined> {
    try {
        const res = await fetch(
            `${TMDB_API_URL}/movie/${movieId}?api_key=${tmdbKey}&language=en-US`,
        );
        const data: Movie = await res.json();
        return data;
    } catch (err) {
        // throw new Error("Failed to get movies");
        console.log(`Failed getting selected movie with error: ${err}`);
    }
}

export async function getMovieStars(
    movieId: number,
): Promise<Cast | undefined> {
    try {
        const res = await fetch(
            `${TMDB_API_URL}/movie/${movieId}/credits?api_key=${tmdbKey}&language=en-US`,
        );
        const data: Cast = await res.json();
        return data;
    } catch (err) {
        // throw new Error("Failed to get movies");
        console.log(`Failed getting movie stars with error: ${err}`);
    }
}

export async function getActorInfo(
    actorId: number,
): Promise<Actor | undefined> {
    try {
        const res = await fetch(
            `${TMDB_API_URL}/person/${actorId}?api_key=${tmdbKey}&language=en-US`,
        );

        const data: Actor = await res.json();
        return data;
    } catch (err) {
        console.log(`Failed getting actor's info with error: ${err}`);
    }
}

export async function getActorsPastMovies(
    actorId: number,
): Promise<People | undefined> {
    try {
        const res = await fetch(
            `${TMDB_API_URL}/person/${actorId}/combined_credits?api_key=${tmdbKey}&language=en-US`,
        );

        const data: People = await res.json();
        return data;
    } catch (err) {
        console.log(`Failed getting actors past movies with error: ${err}`);
    }
}
