import React from 'react'

const Input = React.forwardRef(
  ({ className = '', type = 'text', ...props }, ref) => (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-cyan-500/30 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-cyan-500/30 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 mt-2 ${className}`}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
