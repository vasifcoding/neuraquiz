"use client"

import React from "react"
import { cn } from "@/lib/utils"

const Loader = ({ 
  size = "default", 
  variant = "default", 
  className,
  ...props 
}) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    default: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-3",
    xl: "h-12 w-12 border-4"
  }

  const variantClasses = {
    default: "border-primary border-t-transparent",
    secondary: "border-secondary border-t-transparent",
    destructive: "border-destructive border-t-transparent",
    outline: "border-input border-t-transparent"
  }

  return (
    <div 
      className={cn(
        "animate-spin rounded-full",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading</span>
    </div>
  )
}

// Loader with text
const LoaderWithText = ({ 
  text = "Loading...", 
  size = "default", 
  variant = "default", 
  className,
  ...props 
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader size={size} variant={variant} className={className} {...props} />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
}

// Full page loader overlay
const PageLoader = ({ 
  text = "Loading...", 
  size = "lg", 
  variant = "default", 
  className,
  ...props 
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <LoaderWithText 
        text={text} 
        size={size} 
        variant={variant} 
        className={className} 
        {...props} 
      />
    </div>
  )
}

// Button loader (for use inside buttons)
const ButtonLoader = ({ 
  size = "sm", 
  variant = "default", 
  className,
  ...props 
}) => {
  return (
    <Loader 
      size={size} 
      variant={variant} 
      className={cn("mr-2", className)} 
      {...props} 
    />
  )
}

// Export all loader variants
Loader.WithText = LoaderWithText
Loader.Page = PageLoader
Loader.Button = ButtonLoader

export { Loader }
