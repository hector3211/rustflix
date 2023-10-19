import AddButton from "./Addbutton";

type HeroProps = {
    // I hate this
    featuredItem: any | undefined;
};

export default function Hero({ featuredItem }: HeroProps) {
    return (
        <div className="relative text-gray-500 dark:text-gray-200">
            <img
                src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${featuredItem?.backdrop_path}`}
                alt={`featured Poster`}
                className="sm:h-[400px] object-top lg:w-full lg:h-fit"
            />
            <div className=" p-3 bg-transparent backdrop-blur-3xl shadow-lg shadow-indigo-300/30 rounded-lg ">
                <div className="text-md ml-1">
                    <h2 className="text-xl lg:text-2xl">{featuredItem?.title}</h2>
                    <h2 className="text-xl lg:text-2xl">{featuredItem?.name}</h2>
                    <div className="flex items-center py-1">
                        <p>⭐{featuredItem?.vote_average?.toFixed(1)}</p>
                        <p className="ml-8 text-lg">{featuredItem?.vote_count} Reviews</p>
                    </div>
                    <p className="text-sm lg:text-lg">{featuredItem?.overview}</p>
                </div>
            </div>
            <AddButton />
        </div>
    );
}
