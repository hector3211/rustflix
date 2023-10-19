import { db } from "@/db";
import { LikedMovie, userMoives } from "@/db/schema";

export async function POST(req: Request) {
    const movie = await req.json();
    await db.insert(userMoives).values({
        ...movie,
    });

    return new Response("Successfully created new User Movie", { status: 201 });
}
