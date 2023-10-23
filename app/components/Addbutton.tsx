"use client";

import { NewLikedVideo } from "@/db/schema";
import { Button } from "./ui/button";
import { addUserVideo } from "../lib/dbActions";
import { useEffect, useState } from "react";
import { AlertPop } from "./Alertpopup";
import { VideoTypes } from "@/db/schema";

type ButtonProps = {
    title?: string;
    movieId?: number;
    imgUrl?: string;
    videoType?: (typeof VideoTypes)[keyof typeof VideoTypes];
    userId?: string;
}

export default function AddButton(data: ButtonProps) {
    const [showAlert, setShowAlert] = useState<false | true>(false);
    // console.log(`data that addButton collected -- ${JSON.stringify(data)}`)
    async function addVideo(video: NewLikedVideo) {
        // add movie to users movie list
        console.log(`Got the data in the async funct -${JSON.stringify(video)}\n`)
        await addUserVideo(video)
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
            <Button onClick={() => addVideo(data)} className="text-lg absolute top-1/2 right-10 w-28 bg-gradient-to-tr from-orange-500 to-red-500 active:scale-105 ">
                Add
            </Button>
            {showAlert ? (
                <AlertPop title={data.title!} message={`Successfully Add Item!`} />
            ) : null}
        </>
    )
}
