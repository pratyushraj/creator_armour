import { cn } from '../lib/utils'

interface LoadingSkeletonProps {
    className?: string
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100',
                'bg-[length:200%_100%]',
                'animate-[shimmer_1.5s_infinite]',
                'rounded-lg',
                className
            )}
        />
    )
}

interface CardSkeletonProps {
    className?: string
}

export function CardSkeleton({ className }: CardSkeletonProps) {
    return (
        <div className={cn('bg-white rounded-2xl p-6 shadow-soft border border-gray-100', className)}>
            <div className="flex items-start gap-4">
                <LoadingSkeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-3">
                    <LoadingSkeleton className="h-5 w-3/4" />
                    <LoadingSkeleton className="h-4 w-full" />
                    <LoadingSkeleton className="h-4 w-2/3" />
                </div>
            </div>
        </div>
    )
}

export function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header Skeleton */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <LoadingSkeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                        <LoadingSkeleton className="h-5 w-32" />
                        <LoadingSkeleton className="h-4 w-24" />
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                {/* Hero Card Skeleton */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl p-6">
                    <LoadingSkeleton className="h-6 w-48 mb-4 bg-white/30" />
                    <LoadingSkeleton className="h-10 w-full bg-white/20 rounded-xl" />
                </div>

                {/* Stats Skeleton */}
                <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 shadow-soft border border-gray-100">
                            <LoadingSkeleton className="h-8 w-16 mx-auto mb-2" />
                            <LoadingSkeleton className="h-3 w-20 mx-auto" />
                        </div>
                    ))}
                </div>

                {/* Deals List Skeleton */}
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            </main>
        </div>
    )
}

// Add shimmer animation to tailwind config
// Or add it here as a style tag
const style = document.createElement('style')
style.textContent = `
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
`
if (!document.getElementById('shimmer-animation')) {
    style.id = 'shimmer-animation'
    document.head.appendChild(style)
}