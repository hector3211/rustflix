"use client"
import Link from "next/link";
import { Movie, VideoType } from "@/app/lib/types";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CaourselProps = {
    videos: Movie[] | undefined;
    type: VideoType;
};

export default function Caoursel({ videos, type }: CaourselProps) {
    const posterUrl = "https://image.tmdb.org/t/p/w370_and_h556_bestv2/"
    const [currIdx, setCurrIdx] = useState(0);
    const itemsToShow = 10;

    // caoursel functions
    function nextSlide() {
        if (videos) {
            setCurrIdx((currIdx + itemsToShow) % videos.length);
        }
    }
    function prevSlide() {
        if (videos) {
            setCurrIdx((currIdx - itemsToShow + videos.length) % videos.length);
        }
    }
    const videoData = videos?.slice(currIdx, currIdx + itemsToShow);
    ////

    return (
        <div>
            <div className="relative">
                <button
                    onClick={prevSlide}
                    className="absolute z-40 top-1/2 transform -translate-y-1/2 left-4 text-white bg-black p-2 rounded-full hover:bg-gray-700"
                >
                    <ChevronLeft />
                </button>
                <div className="flex overflow-hidden max-w-full p-4 space-x-2 bg-neutral rounded-box">
                    {videoData?.map((video, idx) => (
                        <div key={idx} className="flex flex-col space-y-1">

                            <Link
                                href={`/${type}/${video.id}`}
                                className="min-w-[150px]"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${video.poster_path}`}
                                    alt={` poster for movie ${idx}`}
                                    className="h-44 w-44 md:h-52 md:w-64  object-cover object-top rounded-md transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-400 hover:cursor-pointer"
                                />
                            </Link>
                        </div>
                    ))}
                </div>
                <button
                    onClick={nextSlide}
                    className="absolute z-40 top-1/2 transform -translate-y-1/2 right-4 text-white bg-black p-2 rounded-full hover:bg-gray-700"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}
