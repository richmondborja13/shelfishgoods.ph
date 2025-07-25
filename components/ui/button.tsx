/**
 * Button Component
 *
 * Front-end Guidelines:
 * - Reusable button component with multiple variants and sizes using class-variance-authority (CVA).
 * - Supports Radix Slot for advanced composition and custom elements.
 * - Use the 'variant' and 'size' props for consistent styling across the app.
 * - UI/UX: Accessible, keyboard-navigable, and visually consistent.
 *
 * Back-end Follow-through:
 * - No direct back-end integration, but ensure button triggers (e.g., form submits, API calls) are handled properly.
 * - Follow accessibility and loading state best practices for actions that interact with the back-end.
 */
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Utility for button style variants using class-variance-authority (CVA)
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * ButtonProps interface
 * - Extends native button props and supports CVA variants
 * - asChild: allows rendering as a custom element via Radix Slot
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * Button component
 * - Supports multiple variants and sizes for consistent UI
 * - Can render as a native button or custom element (asChild)
 * - Forwards ref for accessibility and integration
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Use Radix Slot for advanced composition, otherwise render <button>
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Export Button and style variants for use in other components
export { Button, buttonVariants } 