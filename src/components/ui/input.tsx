import * as React from "react"

import { cn } from "@/lib/utils"
import { FieldInputProps } from "formik";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

interface CustomInputProps extends InputProps {
    formikProps?: Omit<FieldInputProps<string | number | readonly string[]>, 'value'> & {
        value?: string | number | readonly string[];
    };
}

const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type,formikProps , ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...formikProps}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
