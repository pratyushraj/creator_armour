import React from 'react'
import { cn } from '../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    helperText?: string
    error?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, helperText, error, leftIcon, rightIcon, className, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-700 mb-2 tracking-tight"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            // Base styles - Mobile first: full width, 48px height
                            'w-full px-4 py-3.5 rounded-xl',
                            'bg-white text-gray-900',
                            'placeholder:text-gray-400',
                            // Border and transition
                            'border border-gray-200',
                            'transition-all duration-200 ease-out',
                            // Focus states
                            'focus:outline-none focus:border-primary-500',
                            'focus:ring-2 focus:ring-primary-500/20',
                            // Hover state
                            'hover:border-gray-300',
                            // Error state
                            error && 'border-red-300 focus:border-red-500 focus:ring-red-500/20',
                            // Icon padding
                            leftIcon && 'pl-11',
                            rightIcon && 'pr-11',
                            // Disabled state
                            'disabled:bg-gray-50 disabled:cursor-not-allowed',
                            // Font sizing for mobile readability
                            'text-base',
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {(helperText || error) && (
                    <p className={cn(
                        'mt-2 text-sm',
                        error ? 'text-red-600' : 'text-gray-500'
                    )}>
                        {error || helperText}
                    </p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    helperText?: string
    error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, helperText, error, className, id, rows = 4, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-700 mb-2 tracking-tight"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={inputId}
                    rows={rows}
                    className={cn(
                        // Base styles - Mobile first: full width, proper sizing
                        'w-full px-4 py-3.5 rounded-xl',
                        'bg-white text-gray-900',
                        'placeholder:text-gray-400',
                        // Border and transition
                        'border border-gray-200',
                        'transition-all duration-200 ease-out',
                        // Focus states
                        'focus:outline-none focus:border-primary-500',
                        'focus:ring-2 focus:ring-primary-500/20',
                        // Hover state
                        'hover:border-gray-300',
                        // Error state
                        error && 'border-red-300 focus:border-red-500 focus:ring-red-500/20',
                        // Disabled state
                        'disabled:bg-gray-50 disabled:cursor-not-allowed',
                        // Resize
                        'resize-y',
                        // Font sizing for mobile readability
                        'text-base',
                        className
                    )}
                    {...props}
                />
                {(helperText || error) && (
                    <p className={cn(
                        'mt-2 text-sm',
                        error ? 'text-red-600' : 'text-gray-500'
                    )}>
                        {error || helperText}
                    </p>
                )}
            </div>
        )
    }
)

Textarea.displayName = 'Textarea'