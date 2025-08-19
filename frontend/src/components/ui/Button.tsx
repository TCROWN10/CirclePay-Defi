import type React from "react"
import { cn } from "../../lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg" | "icon"
  children: React.ReactNode
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-[#5CA9DE] text-white hover:bg-[#4A8BC7] focus:ring-[#5CA9DE]",
    secondary: "bg-[#1F1A46] text-white hover:bg-[#2A2357] focus:ring-[#1F1A46]",
    outline: "border-2 border-[#5CA9DE] text-[#5CA9DE] bg-white hover:bg-[#5CA9DE] hover:text-white focus:ring-[#5CA9DE]",
    ghost: "text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-gray-500",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "h-10 w-10 p-0", // Square button for icons
  }

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}