'use client';
import Link from "next/link";
import { CastObject, VideoType } from "../lib/types";
import { Suspense, useState } from "react";
import Spinner from "./Spinner";
import { Skeleton } from "./ui/skeleton";
import { ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

type ActorCaourselProps = {
    actors: CastObject[] | undefined;
    type: VideoType;
};

export default function ActorCaoursel({ actors, type }: ActorCaourselProps) {
    const [currIdx, setCurrIdx] = useState(0);
    const itemsToShow = 10;
    // caoursel functions
    function nextSlide() {
        if (actors) {
            setCurrIdx((currIdx + itemsToShow) % actors.length);
        }
    }
    function prevSlide() {
        if (actors) {
            setCurrIdx((currIdx - itemsToShow + actors.length) % actors.length);
        }
    }
    const actorData = actors?.slice(currIdx, currIdx + itemsToShow);
    ////
    return (
        <div className="relative">
            {actorData?.length ? (
                <Suspense fallback={<Spinner />}>
                    <div>
                        <button
                            onClick={prevSlide}
                            className="absolute z-40 top-1/2 transform -translate-y-1/2 left-4 text-white bg-black p-2 rounded-full hover:bg-gray-700"
                        >
                            <ChevronLeft />
                        </button>
                        <div className="flex overflow-hidden max-w-full p-4 space-x-2 bg-neutral rounded-box">

                            {actorData?.map((actor) => (
                                <Link href={`/actor/${actor?.id}/${type}`}>
                                    <div
                                        className="min-w-max"
                                        typeof="button"
                                    >
                                        {actor.profile_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${actor?.profile_path}`}
                                                alt={` poster for movie ${actor?.name}`}
                                                className="w-40 object-cover object-top rounded-md transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-400 hover:cursor-pointer"
                                            />
                                        ) : (
                                            <Skeleton className="w-40 h-[240px] rounded-md" />
                                        )}
                                        <p className="text-center">{actor?.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <button
                            onClick={nextSlide}
                            className="absolute z-40 top-1/2 transform -translate-y-1/2 right-4 text-white bg-black p-2 rounded-full hover:bg-gray-700"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </Suspense>
            ) : null}
        </div>
    );
}
