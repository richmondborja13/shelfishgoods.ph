/**
 * HoverCard Component (UI)
 *
 * Front-end Guidelines:
 * - Provides hover-triggered popover using Radix UI.
 * - Supports custom content, alignment, and styling.
 * - UI/UX: Accessible, animated, and consistent with app design.
 *
 * Back-end Follow-through:
 * - No direct back-end integration, but can be used to show dynamic data from API.
 * - Ensure API endpoints provide data for hover content if needed.
 */
import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in zoom-in-90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-90 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent } 