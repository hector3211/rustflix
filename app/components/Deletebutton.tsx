"use client";

import { LikedMovie, NewLikedMovie } from "@/db/schema";
import { Button } from "./ui/button";
import { addUserMovie, deleteUserMovie } from "../lib/dbActions";
import { useEffect, useState } from "react";
import { AlertPop } from "./Alertpopup";

type ButtonProps = {
    title?: string;
    movieId?: number;
    userId?: string;
}

export default function DeleteButton(data: ButtonProps) {
    const [showAlert, setShowAlert] = useState<false | true>(false);
    // console.log(`data that addButton collected -- ${JSON.stringify(data)}`)
    async function deleteItem(userId: string, movieId: number) {
        // add movie to users movie list
        // console.log(`Got the data in the async funct -${JSON.stringify(movie)}\n`)
        console.log(`Got user Id: ${userId} and movie Id: ${movieId}`);
        if (!userId) {
            return;
        }
        const res = await deleteUserMovie(userId!, movieId!)
        setShowAlert(true);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false)
        }, 5000)

        return () => clearTimeout(timer)
    }, [showAlert])
    return (
        <>
            <Button onClick={() => deleteItem(data.userId!, data.movieId!)} className="text-lg w-28 bg-gradient-to-tr from-orange-500 to-red-500 active:scale-105 ">
                Delete
            </Button>
            {showAlert ? (
                <AlertPop title={data.title!} message={`Successfully Deleted Item!`} />
            ) : null}
        </>
    )
}
