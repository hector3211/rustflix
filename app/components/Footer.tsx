"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bottom-0 w-full flex flex-col md:flex-row md:justify-between items-center py-3 md:py-5 md:pt-5 px-3 md:px-8 lg:px-16">
            <p className="text-center">Copyright © 2023 Hector Oropesa - All Rights Reserved.</p>
            <div className="flex space-x-2 items-center pt-1 md:pt-0">
                <p>Built by</p>
                <Link className="font-bold underline underline-offset-1 hover:scale-95 active:scale-105" href="https://www.hectororopesa.com" target="_blank" >Hector Oropesa</Link>
            </div>
        </footer>
    )
}
