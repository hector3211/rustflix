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
        <Button
          variant={"ghost"}
          className="hover:bg-gray-300"
          onClick={() => setTheme("dark")}
        >
          <Moon />
        </Button>
      ) : (
        <Button
          variant={"ghost"}
          className="text-lg dark:text-white hover:dark:bg-gray-900"
          onClick={() => setTheme("light")}
        >
          <Sun />
        </Button>
      )}
    </div>
  );
}
