"use client";
import Link from "next/link";
import { CastObject, VideoType } from "../lib/types";
import { Suspense, useState } from "react";
import Spinner from "./Spinner";

type ActorCaourselProps = {
  actors: CastObject[] | undefined;
  type: VideoType;
};

export default function ActorCaoursel({ actors, type }: ActorCaourselProps) {
  return (
    <div className="relative">
      <Suspense fallback={<Spinner />}>
        <div className="scrollbar-hide flex max-w-full space-x-2 overflow-auto p-4">
          {actors
            ?.filter((actor) => actor.profile_path)
            .map((actor) => (
              <Link key={actor.id} href={`/actor/${actor?.id}/${type}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${actor?.profile_path}`}
                  alt={` poster for movie ${actor?.name}`}
                  className="duration-400 min-w-[150px] rounded-md object-cover object-top transition delay-100 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer"
                />
                <p className="text-center">{actor?.name}</p>
              </Link>
            ))}
        </div>
      </Suspense>
    </div>
  );
}
