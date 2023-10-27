"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }
  return (
    <div>
      {theme === "light" ? (
        <Moon
          onClick={() => setTheme("dark")}
          className="hover:scale-110 hover:cursor-pointer active:scale-95"
        />
      ) : (
        <Sun
          onClick={() => setTheme("light")}
          className="hover:scale-110 hover:cursor-pointer active:scale-95"
        />
      )}
    </div>
  );
}
