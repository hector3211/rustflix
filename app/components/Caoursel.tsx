"use client";
import Link from "next/link";
import { Movie, TvShow, VideoType } from "@/app/lib/types";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

type CaourselProps = {
  videos: Movie[] | TvShow[] | undefined;
  type: VideoType;
};

function DesktopCaoursel({ videos, type }: CaourselProps) {
  const posterUrl = "https://image.tmdb.org/t/p/w370_and_h556_bestv2/";
  const [currIdx, setCurrIdx] = useState(0);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Define a function to calculate the number of items to show based on window width
  const calculateItemsToShow = () => {
    if (windowWidth && windowWidth < 600) {
      return 4; // Show 5 items for smaller screens
    } else if (windowWidth && windowWidth < 900) {
      return 5;
    } else return 10; // Show 10 items for medium-sized screens
  };

  const itemsToShow = calculateItemsToShow();

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
  //

  return (
    <div className="hidden md:block">
      <div className="relative">
        {currIdx > 0 ? (
          <Button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-40 h-7 w-7 -translate-y-1/2 transform rounded-full bg-black p-1 text-white hover:bg-zinc-900"
          >
            <ChevronLeft />
          </Button>
        ) : null}
        <div className="scrollbar-hide flex max-w-full space-x-2 overflow-auto p-4">
          {videoData
            ?.filter((video) => video.poster_path)
            .map((video) => (
              <div key={video.id} className="flex flex-col space-y-1">
                <Link href={`/${type}/${video.id}`} className="min-w-[150px]">
                  <img
                    src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${video.poster_path}`}
                    alt={` poster for movie ${video.id}`}
                    className="min-w-[100px] rounded-md object-cover  object-top transition delay-300 duration-100 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer"
                  />
                </Link>
              </div>
            ))}
        </div>
        <Button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-40 h-7 w-7 -translate-y-1/2 transform rounded-full bg-black p-1 text-white hover:bg-zinc-900 lg:right-8"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

function MobileCaoursel({ videos, type }: CaourselProps) {
  return (
    <div className="scrollbar-hide flex max-w-full space-x-1 overflow-x-auto scroll-smooth p-4 md:hidden">
      {videos
        ?.filter((video) => video.poster_path)
        .map((video) => (
          <Link key={video.id} href={`/${type}/${video.id}`} className="">
            <img
              src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${video.poster_path}`}
              alt={` poster for movie ${video.id}`}
              className="duration-400 min-w-[100px] rounded-md object-cover object-top transition delay-100 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer"
            />
          </Link>
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
