import { forwardRef } from "react"

type Props = React.HTMLProps<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, Props>((props, forwardedRef) => {
  return (
    <input
      className="bg-gray-400 p-2 text-red-600"
      {...props}
      ref={forwardedRef}
    />
  )
})
Input.displayName = "Input"

export default Input
