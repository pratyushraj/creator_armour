import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(date))
}

export function timeAgo(date: string | Date): string {
    const now = new Date()
    const past = new Date(date)
    const diffMs = now.getTime() - past.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return formatDate(date)
}

export function generateCollabLink(handle: string): string {
    const cleanHandle = handle.replace('@', '').toLowerCase().replace(/[^a-z0-9]/g, '-')
    return `${window.location.origin}/collab/${cleanHandle}`
}

export function getDealStatusColor(status: string): string {
    const colors: Record<string, string> = {
        new_offer: 'bg-blue-100 text-blue-800',
        accepted: 'bg-green-100 text-green-800',
        address_pending: 'bg-yellow-100 text-yellow-800',
        content_creation: 'bg-purple-100 text-purple-800',
        content_submitted: 'bg-indigo-100 text-indigo-800',
        brand_review: 'bg-orange-100 text-orange-800',
        approved: 'bg-green-100 text-green-800',
        changes_requested: 'bg-red-100 text-red-800',
        payment_pending: 'bg-yellow-100 text-yellow-800',
        paid: 'bg-green-100 text-green-800',
        completed: 'bg-gray-100 text-gray-800',
        declined: 'bg-gray-100 text-gray-800',
        cancelled: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
}

export function getDealStatusLabel(status: string): string {
    const labels: Record<string, string> = {
        new_offer: 'Offer Received',
        accepted: 'Accepted',
        address_pending: 'Address Pending',
        content_creation: 'Work in Progress',
        content_submitted: 'Submitted',
        brand_review: 'Under Review',
        approved: 'Approved',
        changes_requested: 'Changes Needed',
        payment_pending: 'Waiting for Payment',
        paid: 'Paid',
        completed: 'Complete',
        declined: 'Declined',
        cancelled: 'Cancelled',
    }
    return labels[status] || status
}
