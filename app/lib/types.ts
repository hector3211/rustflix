export type VideoType = "movies" | "shows";

// type UserResult = {
//   user: User[];
// };
//
// type User = {
//   email?: string;
//   id?: number;
//   likedMovies?: MovieSchema[] | null;
//   createdAt?: Date;
// };

type MovieSchema = {
    id?: number;
    name?: string;
};

export type TvShow = {
    adult: boolean;
    backdrop_path: string;
    created_by: [];
    episode_run_time: number[];
    first_air_date: string;
    genres: { id: number; name: string }[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
        id: number;
        name: string;
        overview: string;
        vote_average: number;
        vote_count: number;
        air_date: string;
        episode_number: number;
        production_code: string;
        runtime: number | null;
        season_number: number;
        show_id: number;
        still_path: string | null;
    };
    name: string;
    next_episode_to_air: {
        id: number;
        name: string;
        overview: string;
        vote_average: number;
        vote_count: number;
        air_date: string;
        episode_number: number;
        production_code: string;
        runtime: number | null;
        season_number: number;
        show_id: number;
        still_path: string | null;
    };
    networks: {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
    }[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    seasons: {
        air_date: string | null;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string | null;
        season_number: number;
    }[];
    vote_average: number;
    vote_count: number;
};

export type Movie = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    };
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

// type PopularMoviesResult = {
//   poster_path?: string | null; // Movie Poster
//   adult?: boolean;
//   overview?: string;
//   release_date?: string;
//   genre_ids?: number[];
//   id?: number; // Movie ID
//   original_title?: string;
//   original_language?: string;
//   title?: string;
//   backdrop_path?: string | null;
//   popularity?: number;
//   vote_count?: number;
//   video?: boolean; // Could be trailer???
//   vote_average?: number;
// };

export type MovieResponse = {
    results?: Movie[];
};

// Cast and Credits
export type CastObject = {
    adult?: boolean;
    gender?: number | null;
    id?: number; // Actors ID
    known_for_department?: string;
    name?: string;
    original_name?: string;
    popularity?: number;
    profile_path?: string | null; // Actors Photo
    cast_id?: number;
    character?: string;
    credit_id?: string;
    order?: number;
};

export type Cast = {
    cast?: CastObject[];
};

type PastMovie = {
    character?: string;
    credit_id?: string;
    release_date?: string;
    vote_count?: number;
    video?: boolean;
    adult?: boolean;
    vote_average?: number;
    title?: string;
    genre_ids?: number[];
    original_language?: string;
    original_title?: string;
    popularity?: number;
    id?: number;
    backdrop_path?: string | null;
    overview?: string;
    poster_path?: string | null;
};

export type Actor = {
    adult?: boolean;
    biography?: string;
    birthday?: string;
    id?: number;
    name?: string;
    place_of_birth?: string;
    popularity?: number;
    profile_path?: string;
};

export type People = {
    cast?: PastMovie[]; // Actors Stared In Movies
};
