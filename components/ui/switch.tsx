// "use client"

// import * as React from "react"
// import * as SwitchPrimitives from "@radix-ui/react-switch"

// import { cn } from "@/lip/utils"

// const Switch = React.forwardRef<
//   React.ElementRef<typeof SwitchPrimitives.Root>,
//   React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
// >(({ className, ...props }, ref) => (
//   <SwitchPrimitives.Root
//     className={cn(
//       "peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-400 data-[state=checked]:to-green-600 data-[state=unchecked]:bg-gray-300",
//       className
//     )}
//     {...props}
//     ref={ref}
//   >
//     <SwitchPrimitives.Thumb
//       className={cn(
//         "pointer-events-none block h-6 w-6 rounded-full bg-white shadow-lg ring-0 transform transition-transform duration-300 ease-in-out data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
//       )}
//     />
//   </SwitchPrimitives.Root>
// ))
// Switch.displayName = SwitchPrimitives.Root.displayName

// export { Switch }

"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils"; // Ensure this path is correct

// Use Omit to exclude the `type` prop from being spread to SwitchPrimitives.Root
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, "type"> & {
    type?: "starRating" | "theme" | "normal";
  }
>(({ className, type = "normal", ...props }, ref) => {
  const isStarRating = type === "starRating";
  const isTheme = type === "theme";
  const isNormal = type === "normal";

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        isStarRating
          ? "data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-white"
          : isTheme
          ? "data-[state=checked]:bg-gray-600 data-[state=unchecked]:bg-white"
          : "data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300", // Default colors for "normal"
        className
      )}
      {...props} // Spread the rest of the props excluding 'type'
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-6 w-6 rounded-full bg-white shadow-lg ring-0 transform transition-transform duration-300 ease-in-out",
          "data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
        )}
      >
        {/* Custom icon rendering based on the switch type and state */}
        <span className="flex items-center justify-center h-full w-full">
          {
            isStarRating
              ? props.checked
                ? "✔️"
                : "✖️" // Tick for star rating when checked, X when unchecked
              : isTheme
              ? props.checked
                ? "🌙"
                : "☀️" // Moon for dark mode, Sun for light mode
              : null /* No icon for normal switches */
          }
        </span>
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
