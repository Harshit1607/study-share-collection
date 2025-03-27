
import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/ThemeContext"
import { Toggle } from "@/components/ui/toggle"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative rounded-full w-9 p-0 h-9"
      onClick={toggleTheme}
    >
      <Sun className={`h-4 w-4 transition-all ${theme === 'dark' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
      <Moon className={`absolute h-4 w-4 transition-all ${theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
