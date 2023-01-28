import React from "react"

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ children, ...props }, ref) => {
  return (
    <label className="max-w-fit" {...props} ref={ref}>
      {children}
    </label>
  )
})
Label.displayName = "Label"

export default Label
