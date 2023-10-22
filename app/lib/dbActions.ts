'use server';

import { db } from "@/db";
import {
    LikedMovie,
    NewLikedMovie,
    userMoives,
    users,
    User,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
export async function getUserId(
    userId: number,
): Promise<User | null | undefined> {
    const data = await db.select().from(users).where(eq(users.id, userId));
    if (data) {
        return data[0];
    }
    console.log(`Error getting user INFO`);
    return undefined;
}

export async function getUserInfo(
    userClerkId: string,
): Promise<User | null | undefined> {
    const data = await db.select().from(users).where(eq(users.clerkId, userClerkId));
    if (data) {
        return data[0];
    }

    return undefined;
}

export async function getUserMovies(
    userClerkId: string,
): Promise<LikedMovie[] | null | undefined> {
    try {
        const data = await db.query.users.findFirst({
            where: eq(users.clerkId, userClerkId),
            with: {
                movies: true,
            },
        });

        if (data) {
            revalidateTag("usermovies")
            return data.movies;
        }
    } catch (err) {
        console.log(`Error getting user's movies: ${err}`);
    }
}

export async function addUserMovie(movie: NewLikedMovie) {
    try {
        await db.insert(userMoives).values({
            ...movie,
        });
        revalidateTag("usermovies")
    } catch (err) {
        console.log(`Error adding a movie in sever action! error: ${err}`)
    }
}

export async function deleteUserMovie(
    userId: string,
    movieId: number,
) {
    console.log(`Got user Id: ${userId} and movie Id: ${movieId}`);
    try {
        const selected = await db
            .delete(userMoives)
            .where(
                and(eq(userMoives.userId, userId), eq(userMoives.movieId, movieId)),
            )
            .returning();
        console.log(`Movie ${selected[0].id} Deleted`)
        revalidateTag("usermovies")
    } catch (err) {
        console.log(`Error deleting user movie! ${err}`);
    }
}

export async function testDbActions() {
    const timer = setTimeout(() => {
        console.log("async test!!!\n")
    }, 3000)
    return () => clearTimeout(timer)
}
