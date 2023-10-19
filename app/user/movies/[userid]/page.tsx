import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getUserMovies } from "@/app/lib/dbActions"

async function routeData(id: string) {
    try {
        const userMovies = await getUserMovies(id)
        return userMovies;
    } catch (err) {
        throw new Error("Couldnt Load users movies!")
    }
}

export default async function Page({ params }: { params: { userId: string } }) {
    const movies = await routeData(params.userId)
    return (
        <div className="flex flex-wrap">
            {movies?.map((movie) => (
                <Card>
                    <CardHeader>
                        <CardTitle>{movie.title}</CardTitle>
                        <CardContent>
                            <img src={`${movie.imgUrl}`} />
                        </CardContent>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}
