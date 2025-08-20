import * as React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 sm:h-12 w-full rounded-lg sm:rounded-xl border border-gray-700/50 bg-black/50 backdrop-blur-sm px-3 sm:px-4 py-2 text-sm sm:text-base text-white placeholder:text-gray-400 focus:border-[#5CA9DE]/50 focus:outline-none focus:ring-2 focus:ring-[#5CA9DE]/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-gray-600/50 touch-manipulation ${className}`}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }
