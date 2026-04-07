import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/Card'
import { DealTimeline, StatusBadge } from '../components/DealTimeline'
import { Input } from '../components/Input'
import { useStore } from '../store/useStore'
import { formatCurrency, generateCollabLink } from '../lib/utils'
import {
    ArrowLeft,
    Instagram,
    Send,
    CheckCircle,
    AlertCircle,
    Clock,
    DollarSign,
    Package,
    Copy
} from 'lucide-react'
import type { DealStatus } from '../types'

export function DealDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { deals, updateDeal, creator } = useStore()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [contentUrl, setContentUrl] = useState('')
    const [urlError, setUrlError] = useState('')
    const [lastSubmissionTime, setLastSubmissionTime] = useState(0)

    const deal = deals.find(d => d.id === id)

    useEffect(() => {
        if (deal?.content_url) {
            setContentUrl(deal.content_url)
        }
    }, [deal])

    const collabLink = creator ? generateCollabLink(creator.instagram_handle) : ''

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(collabLink)
            console.log('Link copied to clipboard')
        } catch (err) {
            console.error('Failed to copy link:', err)
        }
    }

    if (!deal || !creator) {
        return (
            <div className="min-h-screen bg-gradient-premium flex items-center justify-center p-4">
                <Card className="text-center max-w-md border-white">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Work not found</h2>
                    <p className="text-gray-500 text-sm mb-6">This collaboration may have been removed, completed, or the link is invalid</p>
                    <div className="flex gap-3">
                        <Button
                            fullWidth
                            variant="secondary"
                            onClick={() => navigate('/dashboard')}
                        >
                            Back to Dashboard
                        </Button>
                        <Button
                            fullWidth
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }

    const getNextAction = () => {
        switch (deal.status) {
            case 'new_offer':
                return {
                    title: 'Accept Offer',
                    description: 'Review and accept to start the collaboration',
                    action: 'accept_offer',
                }
            case 'content_creation':
                return {
                    title: 'Share Your Post',
                    description: 'Share your Instagram post/reel link',
                    action: 'submit_content',
                }
            case 'changes_requested':
                return {
                    title: 'Review Feedback',
                    description: deal.brand_feedback || 'Brand has requested changes',
                    action: 'review_feedback',
                }
            case 'approved':
                return {
                    title: 'Awaiting Payment',
                    description: `Brand needs to send ${formatCurrency(deal.budget)}`,
                    action: 'await_payment',
                }
            case 'payment_pending':
                return {
                    title: 'Confirm Payment',
                    description: 'Mark as received once payment arrives',
                    action: 'confirm_payment',
                }
            case 'completed':
                return {
                    title: 'Work Done',
                    description: 'Thank you for using Creator Armour!',
                    action: 'none',
                }
            default:
                return null
        }
    }

    const validateInstagramUrl = (url: string): boolean => {
        const instagramPattern = /instagram\.com\/(p|reel|tv)\/[a-zA-Z0-9_-]+/
        if (!instagramPattern.test(url)) {
            setUrlError('Please enter a valid Instagram post, reel, or TV link')
            return false
        }
        setUrlError('')
        return true
    }

    const handleNextAction = async () => {
        const action = getNextAction()?.action
        if (!action) return

        // Prevent rapid double-clicks (debounce: 1 second)
        const now = Date.now()
        if (now - lastSubmissionTime < 1000) {
            return
        }
        setLastSubmissionTime(now)

        if (isSubmitting) return

        if (action === 'submit_content') {
            if (!validateInstagramUrl(contentUrl)) {
                return
            }
        }

        setIsSubmitting(true)
        try {
            let updatedStatus: DealStatus = deal.status

            switch (action) {
                case 'accept_offer':
                    updatedStatus = 'content_creation'
                    await fetch(`/api/deals/${deal.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: updatedStatus }),
                    })
                    break
                case 'submit_content':
                    updatedStatus = 'content_submitted'
                    await fetch(`/api/deals/${deal.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            status: updatedStatus,
                            content_url: contentUrl,
                        }),
                    })
                    break
                case 'confirm_payment':
                    updatedStatus = 'completed'
                    await fetch(`/api/deals/${deal.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: updatedStatus }),
                    })
                    break
            }

            updateDeal({ ...deal, status: updatedStatus, content_url: contentUrl })
        } catch (error) {
            console.error('Failed to update deal:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const nextAction = getNextAction()
    const hasAction = nextAction && nextAction.action !== 'none'

    return (
        <div className="min-h-screen bg-gradient-premium pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 glass border-b border-gray-100/50 shadow-sm animate-fade-in">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-2 hover:bg-slate-100 text-slate-600 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex-1">
                        <h1 className="font-semibold text-gray-900">{deal.brand_name}</h1>
                        <p className="text-sm text-gray-500">{formatCurrency(deal.budget)}</p>
                    </div>
                    <StatusBadge status={deal.status} />
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in-up delay-100">
                {/* Timeline */}
                <Card variant="elevated" className="border-white">
                    <DealTimeline currentStatus={deal.status} />
                </Card>

                {/* Deal Details */}
                <Card variant="elevated" className="border-white">
                    <CardHeader>
                        <CardTitle>Collaboration Details</CardTitle>
                    </CardHeader>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Package className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">What to Create</p>
                                <p className="text-gray-600">{deal.deliverables}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Payment Amount</p>
                                <p className="text-gray-600">{formatCurrency(deal.budget)}</p>
                            </div>
                        </div>

                        {deal.deadline && (
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Deadline</p>
                                    <p className="text-gray-600">
                                        {new Date(deal.deadline).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        )}

                        {deal.content_url && (
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Instagram className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">Your Instagram Post</p>
                                    <a
                                        href={deal.content_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-600 hover:underline break-all"
                                    >
                                        {deal.content_url}
                                    </a>
                                </div>
                            </div>
                        )}

                        {deal.brand_feedback && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-yellow-900">Feedback from Brand</p>
                                        <p className="text-yellow-700 mt-1">{deal.brand_feedback}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Accept Offer Section */}
                {deal.status === 'new_offer' && (
                    <Card className="border-green-200 bg-green-50">
                        <CardHeader>
                            <CardTitle>Accept This Offer?</CardTitle>
                            <CardDescription className="text-green-700">
                                Review the details and accept to start the collaboration
                            </CardDescription>
                        </CardHeader>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Budget:</span>
                                <span className="font-semibold text-lg text-green-700">
                                    {formatCurrency(deal.budget)}
                                </span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-gray-600">Deliverables:</span>
                                <span className="font-medium text-right text-gray-700 max-w-[60%]">
                                    {deal.deliverables}
                                </span>
                            </div>
                            {deal.deadline && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Deadline:</span>
                                    <span className="font-medium text-gray-700">
                                        {new Date(deal.deadline).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3 mt-6">
                            <Button
                                fullWidth
                                onClick={handleNextAction}
                                isLoading={isSubmitting}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Accept Offer
                            </Button>
                            <Button
                                fullWidth
                                variant="secondary"
                                onClick={() => {
                                    updateDeal({ ...deal, status: 'declined' })
                                    navigate('/dashboard')
                                }}
                            >
                                Decline
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Submit Content Section */}
                {deal.status === 'content_creation' && (
                    <Card variant="elevated" className="border-white">
                        <CardHeader>
                            <CardTitle>Submit Your Content</CardTitle>
                            <CardDescription>
                                Share the Instagram link once your content is live
                            </CardDescription>
                        </CardHeader>
                        <div className="space-y-4">
                            <div>
                                <Input
                                    label="Instagram Post/Reel Link"
                                    placeholder="https://instagram.com/p/..."
                                    value={contentUrl}
                                    onChange={(e) => {
                                        setContentUrl(e.target.value)
                                        if (urlError) setUrlError('')
                                    }}
                                />
                                {urlError && (
                                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                        ⚠️ {urlError}
                                    </p>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">
                                💡 Tip: Make sure your post is public so the brand can view it
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    fullWidth
                                    onClick={handleNextAction}
                                    isLoading={isSubmitting}
                                    disabled={!contentUrl}
                                >
                                    Submit Content
                                    <Send className="w-4 h-4 ml-2" />
                                </Button>
                                <Button
                                    fullWidth
                                    variant="secondary"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    Save for Later
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Resubmit Content Section (after changes requested) */}
                {deal.status === 'changes_requested' && (
                    <Card variant="elevated" className="border-orange-200 bg-orange-50/50">
                        <CardHeader>
                            <CardTitle>Revise Your Content</CardTitle>
                            <CardDescription className="text-orange-700">
                                The brand requested changes. Update your content and resubmit.
                            </CardDescription>
                        </CardHeader>
                        {deal.brand_feedback && (
                            <div className="bg-white/70 rounded-lg p-4 mb-4 border border-orange-200">
                                <p className="text-sm font-medium text-orange-900 mb-2">Brand Feedback:</p>
                                <p className="text-orange-800 text-sm">{deal.brand_feedback}</p>
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <Input
                                    label="Updated Instagram Link"
                                    placeholder="https://instagram.com/p/..."
                                    value={contentUrl}
                                    onChange={(e) => {
                                        setContentUrl(e.target.value)
                                        if (urlError) setUrlError('')
                                    }}
                                />
                                {urlError && (
                                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                        ⚠️ {urlError}
                                    </p>
                                )}
                            </div>
                            <Button
                                fullWidth
                                onClick={handleNextAction}
                                isLoading={isSubmitting}
                                disabled={!contentUrl}
                                className="bg-orange-600 hover:bg-orange-700"
                            >
                                Resubmit for Review
                                <Send className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Request Extension (for overdue deals) */}
                {deal.status === 'content_creation' && deal.deadline && new Date(deal.deadline) < new Date() && (
                    <Card className="border-red-200 bg-red-50">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-red-900">Deadline Passed</h3>
                                <p className="text-sm text-red-700 mt-1">
                                    The deadline was {new Date(deal.deadline).toLocaleDateString()}. The brand may be waiting.
                                </p>
                                <div className="flex gap-3 mt-3">
                                    <Button size="sm" variant="secondary" onClick={() => {
                                        // Could open a modal to request extension
                                        console.log('Request extension')
                                    }}>
                                        Request Extension
                                    </Button>
                                    <Button size="sm" onClick={handleNextAction} disabled={!contentUrl}>
                                        Submit Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Confirm Payment Section */}
                {deal.status === 'payment_pending' && (
                    <Card className="border-green-200 bg-green-50">
                        <CardHeader>
                            <CardTitle>Received Payment?</CardTitle>
                            <CardDescription className="text-green-700">
                                Once you've received {formatCurrency(deal.budget)}, confirm to complete the collaboration
                            </CardDescription>
                        </CardHeader>
                        <div className="bg-white/50 rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Amount to confirm:</span>
                                <span className="font-bold text-xl text-green-700">
                                    {formatCurrency(deal.budget)}
                                </span>
                            </div>
                        </div>
                        <Button
                            fullWidth
                            variant="primary"
                            onClick={handleNextAction}
                            isLoading={isSubmitting}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Yes, I Received the Payment
                        </Button>
                        <p className="text-xs text-gray-500 text-center mt-3">
                            Only confirm once the money is in your account
                        </p>
                    </Card>
                )}

                {/* Completion Section */}
                {deal.status === 'completed' && (
                    <Card className="border-green-200 bg-green-50 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <CardHeader>
                            <CardTitle>Collaboration Complete! 🎉</CardTitle>
                            <CardDescription className="text-green-700">
                                You earned {formatCurrency(deal.budget)} from this collaboration
                            </CardDescription>
                        </CardHeader>
                        <div className="flex gap-3">
                            <Button
                                fullWidth
                                variant="secondary"
                                onClick={() => copyLink()}
                            >
                                <Copy className="w-4 h-4 mr-2" />
                                Share Link Again
                            </Button>
                            <Button
                                fullWidth
                                onClick={() => navigate('/dashboard')}
                            >
                                Back to Dashboard
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Brand Contact */}
                <Card variant="elevated" className="border-white">
                    <CardHeader>
                        <CardTitle>Contact Brand</CardTitle>
                    </CardHeader>
                    <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                            Need to discuss something? Reach out to the brand directly:
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                            📧 {deal.brand_email}
                        </p>
                    </div>
                </Card>
            </main>

            {/* Sticky Action Button (Mobile) */}
            {hasAction && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 safe-area-pb">
                    <div className="max-w-4xl mx-auto">
                        <Button
                            fullWidth
                            size="lg"
                            onClick={handleNextAction}
                            isLoading={isSubmitting}
                        >
                            {nextAction?.title}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}