import * as React from "react"
import { cn } from "@/lib/utils"
import {FieldInputProps} from "formik";

interface TextareaProps extends React.ComponentProps<"textarea"> {
    formikProps?: Omit<FieldInputProps<string | number | readonly string[]>, 'value'> & {
        value?: string | number | readonly string[];
    };
}

const Textarea = React.forwardRef<
  HTMLTextAreaElement, TextareaProps
  /*React.ComponentProps<"textarea",*/
>(({ className,formikProps, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...formikProps}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
