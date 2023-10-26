"use client";
import Link from "next/link";
import { CastObject, VideoType } from "../lib/types";
import { Suspense, useState } from "react";
import Spinner from "./Spinner";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

type ActorCaourselProps = {
  actors: CastObject[] | undefined;
  type: VideoType;
};

function Desktop({ actors, type }: ActorCaourselProps) {
  return (
    <div className="hidden md:block">
      <Suspense fallback={<Spinner />}>
        <Swiper modules={[Navigation]} slidesPerView={8} navigation>
          {actors
            ?.filter((actor) => actor.profile_path)
            .map((actor) => (
              <SwiperSlide key={actor.id}>
                <Link href={`/actor/${actor?.id}/${type}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${actor?.profile_path}`}
                    alt={` poster for movie ${actor?.name}`}
                    className="duration-400 rounded-md object-cover object-top transition delay-100 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer"
                  />
                  <p className="text-center">{actor?.name}</p>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </Suspense>
    </div>
  );
}
function Mobile({ actors, type }: ActorCaourselProps) {
  return (
    <div className="block md:hidden">
      <Suspense fallback={<Spinner />}>
        <Swiper modules={[Navigation]} slidesPerView={4} navigation>
          {actors
            ?.filter((actor) => actor.profile_path)
            .map((actor) => (
              <SwiperSlide key={actor.id}>
                <Link href={`/actor/${actor?.id}/${type}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${actor?.profile_path}`}
                    alt={` poster for movie ${actor?.name}`}
                    className="duration-400 rounded-md object-cover object-top transition delay-100 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer"
                  />
                  <p className="text-center">{actor?.name}</p>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </Suspense>
    </div>
  );
}

export default function ActorCaoursel({ actors, type }: ActorCaourselProps) {
  return (
    <div className="relative">
      <Desktop actors={actors} type={type} />
      <Mobile actors={actors} type={type} />
    </div>
  );
}
