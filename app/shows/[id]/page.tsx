import ActorCaoursel from "@/app/components/Actorcaoursel"
import AddButton from "@/app/components/Addbutton"
import { getSelectedShow, getShowStars } from "@/app/lib/movieActions"
import { currentUser } from "@clerk/nextjs";

async function routeData(id: number) {
    try {
        const show = await getSelectedShow(id)
        const actors = await getShowStars(id)
        return {
            show,
            actors
        }
    } catch (err) {
        throw new Error(`Failed to get show Data from Api`)
    }
}

export default async function Page({ params }: { params: { id: number } }) {
    const postImg = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces`
    const user = await currentUser();
    const { show, actors } = await routeData(params.id);
    return (
        <div className="flex flex-col">
            <div className="sm:hidden lg:text-white lg:block lg:w-1/3 lg:bg-transparent lg:backdrop-blur-2xl lg:text-3xl lg:absolute lg:top-[18%] lg:left-5 lg:outline lg:outline-2 lg:outline-offset-2 lg:outline-primary lg:rounded-md lg:p-3 lg:h-52">
                <p>{show?.original_name}</p>
                <p>{show?.vote_average}</p>
            </div>
            <img
                src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${show?.backdrop_path
                    }`}
                alt={`Poster for movie`}
                className="sm:h-[400px] lg:h-[500px] object-left object-cover w-screen"
            />
            <div className="flex bg-neutral lg:pb-5 lg:items-center ">
                <img
                    src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${show?.poster_path
                        }`}
                    alt={` poster for movie ${show?.original_name}`}
                    className="sm:hidden lg:block lg:ml-5 lg:rounded-md lg:outline lg:outline-2 lg:outline-offset-2 lg:outline-primary w-80 object-cover object-top transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-400 hover:cursor-pointer"
                />
                <div className="lg:ml-10 lg:mt-5 sm:p-8 lg:text-2xl text-lg flex justify-start w-full lg:w-1/3">
                    <div className="flex flex-col">
                        <p className="">Title</p>
                        <p className="">Rating</p>
                        <p className="">Seasons</p>
                        <p className="">Episodes</p>
                        <p className="">Genre</p>
                        <p className="">Released</p>
                        <p className="">language</p>
                    </div>
                    <div className="flex flex-col ml-8 w-3/4">
                        <p>{show?.name}</p>
                        <p>{show?.vote_average.toFixed(1)}</p>
                        <p>{show?.number_of_seasons}</p>
                        <p>{show?.number_of_episodes}</p>
                        <div className="flex">
                            {show?.genres.map((genre) => (
                                <p className="px-1">{genre.name}</p>
                            ))}
                        </div>
                        <p>{show?.first_air_date}</p>
                        <p>{show?.original_language}</p>
                    </div>
                    <AddButton videoType={"SHOW"} title={show?.name} movieId={show?.id} imgUrl={`${postImg}${show?.backdrop_path}`} userId={user?.id} />
                </div>
            </div>
            <div className="mb-5">
                <ActorCaoursel actors={actors?.cast} type={"shows"} />
            </div>
        </div>
    )
}
