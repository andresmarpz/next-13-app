import { forwardRef } from "react"

import { cn } from "@/lib/utils"

type Props = React.HTMLProps<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <input
        className={cn(
          className,
          " bg-gray-100 focus:bg-white",
          "shadow-sm rounded px-3 py-1 border border-gray-300",
          "w-full min-w-[125px]"
        )}
        {...props}
        ref={forwardedRef}
      />
    )
  }
)
Input.displayName = "Input"

export default Input
