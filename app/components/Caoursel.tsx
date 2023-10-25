"use client";
import Link from "next/link";
import { Movie, VideoType } from "@/app/lib/types";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CaourselProps = {
  videos: Movie[] | undefined;
  type: VideoType;
};

function DesktopCaoursel({ videos, type }: CaourselProps) {
  const posterUrl = "https://image.tmdb.org/t/p/w370_and_h556_bestv2/";
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
    <div className="hidden lg:block">
      <div className="relative">
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-40 -translate-y-1/2 transform rounded-full bg-black p-2 text-white hover:bg-gray-700"
        >
          <ChevronLeft />
        </button>
        <div className="bg-neutral rounded-box flex max-w-full space-x-2 overflow-hidden p-4">
          {videoData?.map((video, idx) => (
            <div key={idx} className="flex flex-col space-y-1">
              <Link href={`/${type}/${video.id}`} className="min-w-[150px]">
                <img
                  src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${video.poster_path}`}
                  alt={` poster for movie ${idx}`}
                  className="duration-400 h-44 w-44 rounded-md  object-cover object-top transition delay-100 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer md:h-52 md:w-64"
                />
              </Link>
            </div>
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-40 -translate-y-1/2 transform rounded-full bg-black p-2 text-white hover:bg-gray-700"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

function MobileCaoursel({ videos, type }: CaourselProps) {
  return (
    <div className="bg-neutral rounded-box flex max-w-full space-x-2 overflow-x-auto scroll-smooth p-4 lg:hidden">
      {videos?.map((video, idx) => (
        <div key={idx} className="flex flex-col space-y-1">
          <Link href={`/${type}/${video.id}`} className="min-w-[150px]">
            <img
              src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${video.poster_path}`}
              alt={` poster for movie ${idx}`}
              className="duration-400 h-44 w-44 rounded-md  object-cover object-top transition delay-100 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer md:h-52 md:w-64"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function Caoursel({ videos, type }: CaourselProps) {
  return (
    <>
      <DesktopCaoursel type={type} videos={videos} />
      <MobileCaoursel type={type} videos={videos} />
    </>
  );
}
