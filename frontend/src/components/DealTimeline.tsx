import { cn, getDealStatusLabel, getDealStatusColor } from '../lib/utils'
import type { DealStatus } from '../types'

const timelineSteps: DealStatus[] = [
    'new_offer',
    'accepted',
    'content_creation',
    'content_submitted',
    'approved',
    'payment_pending',
    'completed',
]

const stepIcons: Record<string, string> = {
    new_offer: '📩',
    accepted: '✅',
    content_creation: '✍️',
    content_submitted: '📤',
    approved: '⭐',
    payment_pending: '💰',
    completed: '🎉',
}

interface DealTimelineProps {
    currentStatus: DealStatus
    className?: string
}

export function DealTimeline({ currentStatus, className }: DealTimelineProps) {
    const currentIndex = timelineSteps.indexOf(currentStatus)
    const finalStatuses: DealStatus[] = ['completed', 'declined', 'cancelled']

    if (finalStatuses.includes(currentStatus)) {
        return (
            <div className={cn('flex items-center justify-center py-4', className)}>
                <span className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium',
                    getDealStatusColor(currentStatus)
                )}>
                    {getDealStatusLabel(currentStatus)}
                </span>
            </div>
        )
    }

    return (
        <div className={cn('py-4 overflow-x-auto', className)}>
            <div className="flex items-center justify-start min-w-max mx-auto">
                {timelineSteps.map((step, index) => {
                    const isCompleted = index <= currentIndex
                    const isCurrent = index === currentIndex
                    const isLast = index === timelineSteps.length - 1

                    return (
                        <div
                            key={step}
                            className="flex flex-1 items-center"
                        >
                            {/* Step indicator */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={cn(
                                        'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
                                        isCompleted
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-200 text-gray-500',
                                        isCurrent && 'ring-4 ring-primary-200 scale-110'
                                    )}
                                >
                                    {stepIcons[step]}
                                </div>
                                <span
                                    className={cn(
                                        'text-xs mt-2 font-medium',
                                        isCompleted ? 'text-primary-600' : 'text-gray-400'
                                    )}
                                >
                                    {getDealStatusLabel(step)}
                                </span>
                            </div>

                            {/* Connector line */}
                            {!isLast && (
                                <div
                                    className={cn(
                                        'flex-1 h-1 mx-2 rounded-full transition-all duration-300',
                                        index < currentIndex
                                            ? 'bg-primary-600'
                                            : 'bg-gray-200'
                                    )}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

interface StatusBadgeProps {
    status: DealStatus
    size?: 'sm' | 'md'
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full font-medium',
                getDealStatusColor(status),
                size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
            )}
        >
            {getDealStatusLabel(status)}
        </span>
    )
}