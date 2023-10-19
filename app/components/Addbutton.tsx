"use client";

import { NewLikedMovie } from "@/db/schema";
import { Button } from "./ui/button";

type ButtonProps = {
    title: string;
    movieId: number;
    imgUrl: string;
    userId: string;
}

export default function AddButton({ title, movieId, imgUrl, userId }: ButtonProps) {
    async function addMovie(movie: NewLikedMovie) {
        // add movie to users movie list
    }
    return (
        <Button className="outline outline-offset-2 outline-1 outline-white text-lg absolute top-1/3 right-10 w-28 bg-gradient-to-tr from-orange-500 to-indigo-500 active:scale-105 ">
            <div className="space-x-3 flex justify-between items-center">
                <p>Add</p>
            </div>
        </Button>
    )
}
