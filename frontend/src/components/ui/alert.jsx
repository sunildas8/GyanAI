import React from 'react'

const Alert = React.forwardRef(
  ({ className = '', variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={`relative w-full rounded-lg border px-4 py-3 text-sm ${
        variant === 'destructive'
          ? 'border-red-500/50 bg-red-50 text-red-800 dark:border-red-500/50 dark:bg-red-900/20 dark:text-red-400'
          : 'border-cyan-500/30 bg-cyan-50 text-cyan-800 dark:border-cyan-500/30 dark:bg-cyan-900/20 dark:text-cyan-400'
      } ${className}`}
      {...props}
    />
  )
)
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef(
  ({ className = '', ...props }, ref) => (
    <h5 ref={ref} className={`mb-1 font-medium leading-tight ${className}`} {...props} />
  )
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`text-sm [&_p]:leading-relaxed ${className}`} {...props} />
  )
)
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
