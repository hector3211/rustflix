import DeleteButton from "@/app/components/Deletebutton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getUserVideos } from "@/app/lib/dbActions"
import { currentUser } from "@clerk/nextjs";

async function routeData(id: string | undefined) {
    if (!id) {
        throw new Error(`No user Id provided`);
    }
    try {
        const userMovies = await getUserVideos(id)
        return userMovies;
    } catch (err) {
        throw new Error("Couldnt Load users movies!")
    }
}

export default async function Page() {
    const user = await currentUser();
    const videos = await routeData(user?.id)
    return (
        <div className="flex flex-col px-2">
            <div className="w-full flex flex-col">
                <h1 className="font-medium text-xl">Your Favotie Moives And Shows</h1>
                <div>
                    <p className="font-thin">lorem text here</p>
                </div>
            </div>
            <div className="md:flex md:flex-wrap md:justify-center md:gap-2">
                {videos?.map((videos) => (
                    <Card key={videos.id} className="max-w-[300px]">
                        <CardHeader>
                            <CardContent className="p-0">
                                <img className="rounded-md" src={`${videos.imgUrl}`} />
                            </CardContent>
                            <CardDescription>{videos.title}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <DeleteButton title={videos.title!} movieId={videos?.movieId!} userId={user?.id} />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
