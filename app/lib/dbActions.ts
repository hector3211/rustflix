"use server";

import { db } from "@/db";
import {
  LikedVideo,
  NewLikedVideo,
  userVideos,
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
  const data = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userClerkId));
  if (data) {
    return data[0];
  }

  return undefined;
}

export async function getUserVideos(
  userClerkId: string,
): Promise<LikedVideo[] | null | undefined> {
  try {
    const data = await db.query.users.findFirst({
      where: eq(users.clerkId, userClerkId),
      with: {
        movies: true,
      },
    });

    if (data) {
      revalidateTag("usermovies");
      return data.movies;
    }
  } catch (err) {
    console.log(`Error getting user's movies: ${err}`);
  }
}

export async function addUserVideo(movie: NewLikedVideo) {
  try {
    await db.insert(userVideos).values({
      ...movie,
    });
    revalidateTag("usermovies");
  } catch (err) {
    console.log(`Error adding a movie in sever action! error: ${err}`);
  }
}

export async function deleteUserVideo(userId: string, movieId: number) {
  console.log(`Got user Id: ${userId} and movie Id: ${movieId}`);
  try {
    const selected = await db
      .delete(userVideos)
      .where(
        and(eq(userVideos.userId, userId), eq(userVideos.movieId, movieId)),
      )
      .returning();
    console.log(`Movie ${selected[0].id} Deleted`);
    revalidateTag("usermovies");
  } catch (err) {
    console.log(`Error deleting user movie! ${err}`);
  }
}

export async function testDbActions() {
  const timer = setTimeout(() => {
    console.log("async test!!!\n");
  }, 3000);
  return () => clearTimeout(timer);
}
