"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }
  return (
    <div>
      <Button variant={"ghost"} className="hover:bg-transparent">
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
      </Button>
    </div>
  );
}
