import React from 'react'

const Button = React.forwardRef(
  (
    { className = '', variant = 'default', size = 'default', ...props },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-cyan-500'
    
    const variants = {
      default: 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600 dark:from-[#60A6AF] dark:to-cyan-500 dark:hover:from-[#4a7c81] dark:hover:to-cyan-600',
      destructive: 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-900 dark:hover:bg-red-800',
      outline: 'border border-cyan-500/30 bg-transparent text-cyan-400 hover:bg-cyan-500/10 dark:border-cyan-500/30 dark:text-cyan-400',
      ghost: 'text-cyan-400 hover:bg-cyan-500/10 dark:text-cyan-400 dark:hover:bg-cyan-500/10',
    }

    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3 text-sm',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    }

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
