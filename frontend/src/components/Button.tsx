import React from 'react'
import { cn } from '../lib/utils'
import { LoadingSpinner } from './LoadingSpinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    isLoading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    children: React.ReactNode
}

export function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    className,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = cn(
        // Layout
        'inline-flex items-center justify-center font-medium relative',
        'transition-all duration-200 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        // Smooth active state
        'active:scale-[0.97]',
        // Full width
        fullWidth && 'w-full',
        // Loading state
        isLoading && 'pointer-events-none',
    )

    const variants = {
        primary: cn(
            'bg-primary-600 text-white',
            'hover:bg-primary-700 hover:shadow-glow',
            'focus:ring-primary-500',
            'active:bg-primary-800',
            'border border-transparent',
        ),
        secondary: cn(
            'bg-white text-gray-700',
            'border border-gray-200',
            'hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
            'focus:ring-primary-500',
            'active:bg-gray-100',
        ),
        ghost: cn(
            'bg-transparent text-gray-600',
            'hover:bg-gray-100 hover:text-gray-900',
            'focus:ring-gray-500',
            'active:bg-gray-200',
            'border border-transparent',
        ),
        danger: cn(
            'bg-red-600 text-white',
            'hover:bg-red-700 hover:shadow-lg',
            'focus:ring-red-500',
            'active:bg-red-800',
            'border border-transparent',
        ),
    }

    const sizes = {
        // Mobile-first: all buttons minimum 48px for accessibility
        sm: cn('rounded-lg px-4 py-3 text-sm gap-1.5 min-h-[48px]'),
        md: cn('rounded-xl px-5 py-3 text-sm gap-2 min-h-[48px]'),
        lg: cn('rounded-xl px-6 py-3.5 text-base gap-2 min-h-[48px]'),
    }

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <LoadingSpinner size={size === 'sm' ? 'sm' : 'md'} />
                </span>
            )}
            <span className={cn('flex items-center gap-2', isLoading && 'opacity-0')}>
                {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                {children}
                {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
            </span>
        </button>
    )
}