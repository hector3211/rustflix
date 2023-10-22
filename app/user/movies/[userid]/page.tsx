import DeleteButton from "@/app/components/Deletebutton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getUserMovies } from "@/app/lib/dbActions"
import { currentUser } from "@clerk/nextjs";

async function routeData(id: string | undefined) {
    if (!id) {
        throw new Error(`No user Id provided`);
    }
    try {
        const userMovies = await getUserMovies(id)
        return userMovies;
    } catch (err) {
        throw new Error("Couldnt Load users movies!")
    }
}

export default async function Page({ params }: { params: { userId: string } }) {
    const user = await currentUser();
    const movies = await routeData(user?.id)
    return (
        <div className="">
            {movies?.map((movie) => (
                <Card>
                    <CardHeader>
                        <CardTitle>{movie.title}</CardTitle>
                        <CardContent>
                            <img src={`${movie.imgUrl}`} />
                        </CardContent>
                    </CardHeader>
                    <CardFooter>
                        <DeleteButton title={movie.title!} movieId={movie?.movieId!} userId={user?.id} />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
