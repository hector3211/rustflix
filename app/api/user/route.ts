import { db } from "@/db";
import { LikedVideo, userVideos } from "@/db/schema";

export async function POST(req: Request) {
    const movie = await req.json();
    await db.insert(userVideos).values({
        ...movie,
    });

    return new Response("Successfully created new User Movie", { status: 201 });
}
