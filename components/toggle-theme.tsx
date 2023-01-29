"use client"

import { Palette } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      onClick={() =>
        theme ? setTheme(theme === "dark" ? "light" : "dark") : undefined
      }
    >
      <Palette className="h-4 w-4" />
    </Button>
  )
}
