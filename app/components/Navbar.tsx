"use client";
import Link from "next/link";
import ThemeToggleButton from "./Themebutton";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAuth, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu } from "lucide-react";

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
      className={`${
        navColor ? "bg-gray-100/20 backdrop-blur-lg" : "bg-transparent"
      }
       fixed top-0 z-50 hidden w-full items-center justify-between px-10 py-3 md:flex`}
    >
      <Link href={"/"}>
        <h1 className="font-extrabold text-orange-500 hover:cursor-pointer md:text-3xl">
          Rustflix
        </h1>
      </Link>
      <div className="flex items-center space-x-3">
        <Button
          variant={"link"}
          className="active:scale-96 px-0 hover:scale-105"
        >
          <Link href={"/"}>Home</Link>
        </Button>
        {isSignedIn || user ? (
          <Button variant={"link"} className="active:scale-96 hover:scale-105">
            <Link href={`/user/videos`}>Favorites</Link>
          </Button>
        ) : null}
        <ThemeToggleButton />
        <Button
          variant={"ghost"}
          className="hover:scale-105 hover:bg-transparent active:scale-95"
        >
          {!isLoaded || !userId ? (
            <SignInButton />
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </Button>
      </div>
    </div>
  );
}

function Mobile() {
  const { isLoaded, userId } = useAuth();
  const { isSignedIn, user } = useUser();
  const [navColor, setNavColor] = useState<true | false>(false);
  const [open, setOpen] = useState<true | false>(false);
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
      className={`${
        navColor ? "bg-gray-100/20 backdrop-blur-lg" : "bg-transparent"
      }
       fixed top-0 z-50 flex w-full items-center justify-between px-2 py-3 md:hidden`}
    >
      <Link href={"/"}>
        <h1 className="pl-3 text-lg font-extrabold text-orange-500 active:scale-95">
          Rustflix
        </h1>
      </Link>
      <div className="flex items-center">
        <ThemeToggleButton />
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} onClick={() => setOpen((prev) => !prev)}>
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                className="w-full"
                onClick={() => setOpen((prev) => !prev)}
                href={"/"}
              >
                Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {isSignedIn || user ? (
                <Link
                  className="w-full"
                  onClick={() => setOpen((prev) => !prev)}
                  href={`/user/videos`}
                >
                  Favorites
                </Link>
              ) : null}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {!isLoaded || !userId ? (
                <SignInButton />
              ) : (
                <div className="flex w-full items-center justify-between">
                  <p>Profile</p>
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function Nav() {
  return (
    <nav>
      <Desktop />
      <Mobile />
    </nav>
  );
}
