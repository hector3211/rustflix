import { Heart, Play } from "lucide-react";
import { Movie, MovieOrTvShow, TvShow } from "../lib/types";
import { Button } from "./ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

type HeroProps = {
  // I hate this
  featuredItem: MovieOrTvShow;
};

function isMovie(video: MovieOrTvShow): video is Movie {
  return (video as Movie).title !== undefined;
}

export default async function Hero({ featuredItem }: HeroProps) {
  const user = await currentUser();
  function truncate(string: string, num: number) {
    return string?.length > num ? string.substring(0, num - 1) + "..." : string;
  }
  return (
    <div className="relative text-gray-500 dark:text-gray-200">
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${featuredItem?.backdrop_path}`}
          alt={`featured Poster`}
          className="object-contain object-top sm:h-[400px] lg:h-fit lg:w-full"
        />
        <div className="absolute bottom-0 left-0 z-40 h-16 w-full bg-transparent  bg-gradient-to-b from-gray-900/5 to-zinc-950" />
      </div>
      <div className="left-5  top-[20%] block max-h-[20rem] w-full  rounded-md bg-zinc-950/90 p-5 text-lg text-white backdrop-blur-lg md:absolute   md:max-w-[40%] lg:left-14 lg:top-[45%] lg:max-w-[500px] lg:rounded-lg">
        <div className="flex items-center space-x-1 py-1 text-sm">
          <h1 className="text-3xl font-bold lg:text-5xl">
            {isMovie(featuredItem)
              ? `${featuredItem?.title}`
              : `${featuredItem?.name}`}
          </h1>
        </div>
        <p className="text-justify text-sm font-medium">
          {truncate(`${featuredItem?.overview}`, 150)}
        </p>
        <div className="mt-5 flex items-center justify-evenly space-x-3">
          <Link
            href={`/${
              isMovie(featuredItem) ? "movies" : "shows"
            }/${featuredItem?.id}`}
            className="w-full"
          >
            <Button className="w-full bg-orange-500/95 hover:scale-105 hover:bg-orange-500 active:scale-95">
              Play
              <Play className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          {user ? (
            <Link href={`/user/videos`} className="w-full">
              <Button
                variant={"outline"}
                className="w-full text-gray-800 hover:scale-105 active:scale-95 dark:text-white"
              >
                <div className="flex items-center">
                  MyList
                  <Heart className="ml-1 h-4 w-4" />
                </div>
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
