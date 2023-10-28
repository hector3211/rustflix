"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bottom-0 flex h-8 w-full flex-col items-center px-3 py-2 text-sm md:flex-row md:justify-between md:px-8 lg:px-16">
      <p className="text-center">
        Copyright © 2023 Hector Oropesa - All Rights Reserved.
      </p>
      <div className="flex space-x-2 pt-1 text-center md:pt-0">
        <p>Built by</p>
        <Link
          className="font-bold underline underline-offset-1 hover:scale-95 active:scale-105"
          href="https://www.hectororopesa.com"
          target="_blank"
        >
          Hector Oropesa
        </Link>
      </div>
    </footer>
  );
}
