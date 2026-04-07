import React from 'react'
import { cn } from '../lib/utils'

interface CardProps {
    children: React.ReactNode
    className?: string
    padding?: 'none' | 'sm' | 'md' | 'lg'
    hover?: boolean
    onClick?: () => void
    variant?: 'default' | 'elevated' | 'bordered' | 'glass'
}

export function Card({
    children,
    className,
    padding = 'md',
    hover = false,
    onClick,
    variant = 'default',
}: CardProps) {
    const paddingStyles = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    }

    const variants = {
        default: cn(
            'bg-white rounded-2xl shadow-soft border border-gray-100',
            'transition-all duration-300 ease-out',
        ),
        elevated: cn(
            'bg-white rounded-2xl shadow-soft-lg border border-gray-100',
            'transition-all duration-300 ease-out',
        ),
        bordered: cn(
            'bg-white rounded-2xl shadow-none border border-gray-200',
            'transition-all duration-300 ease-out',
        ),
        glass: cn(
            'bg-white/70 backdrop-blur-xl rounded-2xl',
            'border border-white/20 shadow-soft',
            'transition-all duration-300 ease-out',
        ),
    }

    const hoverStyles = hover && cn(
        'hover:shadow-soft-lg hover:border-primary-200 cursor-pointer',
        'hover:-translate-y-0.5',
        'transition-all duration-300 ease-out',
    )

    return (
        <div
            className={cn(
                variants[variant],
                paddingStyles[padding],
                hoverStyles,
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

interface CardHeaderProps {
    children: React.ReactNode
    className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return (
        <div className={cn('mb-5', className)}>
            {children}
        </div>
    )
}

interface CardTitleProps {
    children: React.ReactNode
    className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
    return (
        <h3 className={cn('text-lg font-semibold text-gray-900 tracking-tight', className)}>
            {children}
        </h3>
    )
}

interface CardDescriptionProps {
    children: React.ReactNode
    className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
    return (
        <p className={cn('text-sm text-gray-500 leading-relaxed mt-1.5', className)}>
            {children}
        </p>
    )
}

interface CardContentProps {
    children: React.ReactNode
    className?: string
}

export function CardContent({ children, className }: CardContentProps) {
    return (
        <div className={cn('', className)}>
            {children}
        </div>
    )
}

interface CardFooterProps {
    children: React.ReactNode
    className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
    return (
        <div className={cn('mt-6 pt-5 border-t border-gray-100', className)}>
            {children}
        </div>
    )
}