import * as React from "react";
import { cn } from "../lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "authority" | "performance" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "authority", ...props }, ref) => {
        const variants = {
            authority: "bg-authority text-canvas hover:bg-authority/90",
            performance: "bg-performance text-canvas hover:bg-performance/90",
            ghost: "bg-transparent text-ink hover:bg-slate-divider",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-sm px-6 py-2 text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
