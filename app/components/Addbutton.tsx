"use client";

import { NewLikedMovie } from "@/db/schema";
import { Button } from "./ui/button";
import { addUserMovie } from "../lib/dbActions";
import { useEffect, useState } from "react";
import { AlertPop } from "./Alertpopup";

type ButtonProps = {
    title?: string;
    movieId?: number;
    imgUrl?: string;
    userId?: string;
}

export default function AddButton(data: ButtonProps) {
    const [showAlert, setShowAlert] = useState<false | true>(false);
    // console.log(`data that addButton collected -- ${JSON.stringify(data)}`)
    async function addMovie(movie: NewLikedMovie) {
        // add movie to users movie list
        console.log(`Got the data in the async funct -${JSON.stringify(movie)}\n`)
        await addUserMovie(movie)
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
            <Button onClick={() => addMovie(data)} className="text-lg absolute top-1/2 right-10 w-28 bg-gradient-to-tr from-orange-500 to-red-500 active:scale-105 ">
                Add
            </Button>
            {showAlert ? (
                <AlertPop title={data.title!} message={`Successfully Add Item!`} />
            ) : null}
        </>
    )
}
