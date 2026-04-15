import React, { useState } from 'react'

const PasswordInput = React.forwardRef(
  ({ className = '', ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
      <div className='relative w-full'>
        <input
          type={isVisible ? 'text' : 'password'}
          className={`flex h-10 w-full rounded-md border border-cyan-500/30 bg-slate-950 px-3 py-2 pr-10 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-cyan-500/30 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 mt-2 ${className}`}
          ref={ref}
          {...props}
        />
        <button
          type='button'
          onClick={() => setIsVisible(!isVisible)}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors'
          tabIndex={-1}
        >
          {isVisible ? (
            <svg
              className='cursor-pointer'
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
              <circle cx='12' cy='12' r='3'></circle>
            </svg>
          ) : (
            <svg
              className='cursor-pointer'
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'></path>
              <line x1='1' y1='1' x2='23' y2='23'></line>
            </svg>
          )}
        </button>
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
