"use client";
import Link from "next/link";
import ThemeToggleButton from "./Themebutton";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useAuth, SignInButton, UserButton, useUser } from "@clerk/nextjs";



function Desktop() {
    const { isLoaded, userId } = useAuth();
    const { isSignedIn, user } = useUser();
    const [navColor, setNavColor] = useState(false);

    function handleScroll() {
        if (window.scrollY > 0) {
            setNavColor(true);
        } else if (window.scrollY <= 0) {
            setNavColor(false);
        }
    }
    if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll);
    }

    return (
        <div
            className={`${navColor ? "backdrop-blur-lg bg-gray-100/20" : "bg-transparent"
                }
       fixed top-0 z-50 w-full flex items-center justify-between px-5 py-3`}
        >
            <Link href={"/"}>
                <h1 className="text-orange-500 md:text-3xl font-semibold tracking-wide hover:cursor-pointer">
                    Rustflix
                </h1>
            </Link>
            <div className="flex items-center space-x-3">
                <Button variant={"link"} className="lg:text-lg">
                    <Link href={"/"}>Home</Link>
                </Button>
                <Button variant={"link"} className="lg:text-lg">
                    <Link href={"/"}>About</Link>
                </Button>

                {isSignedIn || user ? (
                    <Button variant={"link"} className="lg:text-lg">
                        <Link href={`/user/movies/${userId}`}>
                            Movies
                        </Link>
                    </Button>
                ) : null}
                {!isLoaded || !userId ? (
                    <SignInButton />
                ) : (
                    <UserButton afterSignOutUrl="/" />
                )}
                <ThemeToggleButton />
            </div>
        </div>
    );
}

export default function Nav() {
    return (
        <nav>
            <Desktop />
        </nav>
    );
}
