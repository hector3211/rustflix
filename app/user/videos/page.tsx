import DeleteButton from "@/app/components/Deletebutton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/app/components/ui/card";
import { getUserVideos } from "@/app/lib/dbActions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

async function routeData(id: string | undefined) {
  if (!id) {
    throw new Error(`No user Id provided`);
  }
  try {
    const userMovies = await getUserVideos(id);
    return userMovies;
  } catch (err) {
    throw new Error("Couldnt Load users movies!");
  }
}

export default async function Page() {
  const user = await currentUser();
  const videos = await routeData(user?.id);
  return (
    <div className="flex min-h-[780px] flex-col px-5">
      <div className="flex w-full flex-col py-10">
        <h1 className="text-xl font-medium">Your Favotie Moives And Shows</h1>
        <div>
          <p className="text-sm font-light">{`${user?.firstName}'s video list`}</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 md:justify-start lg:justify-center">
        {videos?.map((videos) => (
          <Card key={videos.id} className="max-w-[300px]">
            <CardHeader>
              <CardContent className="p-0 hover:scale-105 active:scale-95">
                <Link
                  href={`/${videos.videoType?.toLowerCase()}s/${
                    videos.movieId
                  }`}
                >
                  <img className="rounded-md" src={`${videos.imgUrl}`} />
                </Link>
              </CardContent>
              <CardDescription className="min-h-[2.5rem]">
                {videos.title}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <DeleteButton
                title={videos.title!}
                movieId={videos?.movieId!}
                userId={user?.id}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
