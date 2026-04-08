import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/Card'
import { StatusBadge } from '../components/DealTimeline'
import { useStore } from '../store/useStore'
import { formatCurrency, generateCollabLink } from '../lib/utils'
import {
    Copy,
    Share2,
    Plus,
    ArrowUpRight,
    Clock,
    AlertCircle,
    LogOut,
    Instagram,
    Sparkles,
    CheckCircle,
    Shield,
    HelpCircle
} from 'lucide-react'
import type { Deal } from '../types'

export function Dashboard() {
    const navigate = useNavigate()
    const {
        user,
        creator,
        deals,
        setDeals,
        logout,
        isAuthenticated
    } = useStore()

    // Authentication is now handled by ProtectedRoute

    // For new users, start with empty deals array
    // Mock data is only for demo purposes and should be removed in production
    useEffect(() => {
        // Only load mock data if explicitly requested (for demo)
        // In production, this would fetch from API
        const shouldShowMockData = localStorage.getItem('showMockData') === 'true'
        
        if (shouldShowMockData) {
            const mockDeals: Deal[] = [
                {
                    id: '1',
                    creator_id: '1',
                    brand_name: 'Glow Skincare',
                    brand_email: 'hello@glowskincare.com',
                    status: 'content_creation',
                    budget: 500,
                    deliverables: '1 Instagram Reel + 3 Stories',
                    deadline: '2024-02-15',
                    created_at: '2024-01-20T10:00:00Z',
                    updated_at: '2024-01-25T14:30:00Z',
                },
                {
                    id: '2',
                    creator_id: '1',
                    brand_name: 'Tech Gadgets Co',
                    brand_email: 'marketing@techgadgets.com',
                    status: 'payment_pending',
                    budget: 800,
                    deliverables: '2 Instagram Posts + 1 Reel',
                    deadline: '2024-01-30',
                    created_at: '2024-01-10T09:00:00Z',
                    updated_at: '2024-01-28T16:00:00Z',
                },
            ]
            setDeals(mockDeals)
        } else {
            // New users start with empty deals
            setDeals([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setDeals])

    const collabLink = creator ? generateCollabLink(creator.instagram_handle) : ''

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(collabLink)
            // Show toast notification would go here
            console.log('Link copied to clipboard')
        } catch (err) {
            console.error('Failed to copy link:', err)
        }
    }

    const shareLink = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: `${creator?.name}'s Collab Page`,
                    text: `Check out my collaboration page!`,
                    url: collabLink,
                })
            } else {
                copyLink()
            }
        } catch (err) {
            console.error('Share failed:', err)
            copyLink()
        }
    }

    const newOffers = deals.filter(d => d.status === 'new_offer')
    const activeDeals = deals.filter(d => ['accepted', 'content_creation', 'content_submitted', 'approved', 'changes_requested'].includes(d.status))
    const pendingPaymentDeals = deals.filter(d => d.status === 'payment_pending')
    const completedDeals = deals.filter(d => d.status === 'completed')
    const declinedDeals = deals.filter(d => d.status === 'declined')
    const totalEarnings = completedDeals.reduce((sum, d) => sum + d.budget, 0)

    // Prioritize offers - highest budget first
    const sortedNewOffers = [...newOffers].sort((a, b) => b.budget - a.budget)


    return (
        <div className="min-h-screen bg-gradient-premium pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 glass border-b border-gray-100/50 shadow-sm animate-fade-in">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                            {creator?.name?.charAt(0).toUpperCase() || 'C'}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="font-semibold text-gray-900">{creator?.name || 'Creator'}</h1>
                                <span className="flex items-center gap-1 text-primary-600" title="Verified Creator">
                                    <CheckCircle className="w-4 h-4" />
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">@{creator?.instagram_handle || 'username'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => logout()}>
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in-up delay-100">
                {/* Welcome Message for New Users */}
                {deals.length === 0 && (
                    <Card className="bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-6 h-6 text-primary-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">Welcome to Creator Armour! 🎉</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    You're all set! Here's how to get your first collaboration:
                                </p>
                                <ol className="text-sm text-gray-600 mt-3 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="w-5 h-5 bg-primary-200 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                        Copy your collaboration link below
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-5 h-5 bg-primary-200 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                        Share it on your Instagram bio or stories
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-5 h-5 bg-primary-200 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                        Brands will send you clear offers — no confusing DMs!
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Payment Protection Info */}
                <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Shield className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                Payment Protection
                                <HelpCircle className="w-4 h-4 text-gray-400" />
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Your earnings are protected. Brands confirm payment before deals are marked complete. 
                                Only confirm you've received payment once the money is in your account.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Collab Link Card */}
                <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl border-none relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <div className="relative z-10">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-yellow-400" />
                                Your Collaboration Link
                            </CardTitle>
                            <CardDescription className="text-slate-300">
                                {creator?.instagram_handle ? 'Share this link with brands to receive clear offers — no more confusing DMs' : 'Please complete your profile by setting an Instagram handle to generate your link.'}
                            </CardDescription>
                        </CardHeader>
                        <div className="flex items-center gap-2 mt-4 px-6 pb-6">
                            {creator?.instagram_handle ? (
                                <>
                                    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-sm font-mono truncate border border-white/10">
                                        {collabLink}
                                    </div>
                                    <Button variant="secondary" size="sm" onClick={copyLink} className="bg-white/10 text-white hover:bg-white/20 border-white/10">
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                    <Button variant="secondary" size="sm" onClick={shareLink} className="bg-white/10 text-white hover:bg-white/20 border-white/10">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </>
                            ) : (
                                <Button variant="secondary" className="w-full bg-white/10 text-white hover:bg-white/20 border-white/10" onClick={() => navigate('/settings')}>
                                    Set up your handle
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                    <Card padding="sm" variant="elevated" className="text-center group border-white">
                        <p className="text-3xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{activeDeals.length}</p>
                        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">Active Collaborations</p>
                    </Card>
                    <Card padding="sm" variant="elevated" className="text-center group border-white">
                        <p className="text-3xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{formatCurrency(totalEarnings)}</p>
                        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">Total Earnings</p>
                    </Card>
                    <Card padding="sm" variant="elevated" className="text-center group border-white">
                        <p className="text-3xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{pendingPaymentDeals.length}</p>
                        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">Pending Payments</p>
                    </Card>
                </div>

                {/* New Offers Section - Prioritized */}
                {sortedNewOffers.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                New Offers ({sortedNewOffers.length})
                            </h2>
                            <span className="text-xs text-gray-500">Highest budget shown first</span>
                        </div>
                        <div className="space-y-4">
                            {sortedNewOffers.map((deal, index) => (
                                <Card
                                    key={deal.id}
                                    hover
                                    variant="elevated"
                                    onClick={() => navigate(`/deal/${deal.id}`)}
                                    padding="sm"
                                    className={`group cursor-pointer ${index === 0 ? 'ring-2 ring-primary-400 border-primary-300' : 'border-white'}`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-gray-900">{deal.brand_name}</h3>
                                                <StatusBadge status={deal.status} size="sm" />
                                                {index === 0 && sortedNewOffers.length > 1 && (
                                                    <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full font-medium">
                                                        ⭐ Best Offer
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 mb-2">{deal.deliverables}</p>
                                            <div className="flex items-center gap-4 text-xs text-gray-400">
                                                <span className="font-semibold text-primary-600">
                                                    {formatCurrency(deal.budget)}
                                                </span>
                                                {deal.deadline && (
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        Due {new Date(deal.deadline).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-gray-400" />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Payment Alerts */}
                {pendingPaymentDeals.length > 0 && (
                    <Card className="border-yellow-200 bg-yellow-50">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <AlertCircle className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">Waiting for Payment</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {pendingPaymentDeals[0].brand_name} owes you {formatCurrency(pendingPaymentDeals[0].budget)}
                                </p>
                                <Button
                                    size="sm"
                                    className="mt-3"
                                    onClick={() => navigate(`/deal/${pendingPaymentDeals[0].id}`)}
                                >
                                    Send Reminder
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Active Work */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">In Progress ({activeDeals.length})</h2>
                    </div>

                    <div className="space-y-4">
                        {activeDeals.map((deal) => {
                            const isOverdue = deal.deadline && new Date(deal.deadline) < new Date()
                            return (
                                <Card
                                    key={deal.id}
                                    hover
                                    variant="elevated"
                                    onClick={() => navigate(`/deal/${deal.id}`)}
                                    padding="sm"
                                    className={`group cursor-pointer ${isOverdue ? 'border-red-300 bg-red-50' : 'border-white'}`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-gray-900">{deal.brand_name}</h3>
                                                <StatusBadge status={deal.status} size="sm" />
                                                {isOverdue && (
                                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                                                        Overdue
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 mb-2">{deal.deliverables}</p>
                                            <div className="flex items-center gap-4 text-xs text-gray-400">
                                                <span className="font-semibold text-primary-600">
                                                    {formatCurrency(deal.budget)}
                                                </span>
                                                {deal.deadline && (
                                                    <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
                                                        <Clock className="w-3 h-3" />
                                                        {isOverdue ? 'Overdue!' : `Due ${new Date(deal.deadline).toLocaleDateString()}`}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-gray-400" />
                                    </div>
                                </Card>
                            )
                        })}
                    </div>

                    {activeDeals.length === 0 && newOffers.length === 0 && (
                        <Card className="text-center py-8">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Plus className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 mb-2 font-medium">No collaborations yet</p>
                            <p className="text-gray-400 text-sm mb-4">Share your collaboration link to receive offers from brands</p>
                            <Button variant="secondary" size="sm" onClick={() => copyLink()}>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Your Link
                            </Button>
                        </Card>
                    )}
                </section>

                {/* Past Deals Toggle */}
                {(completedDeals.length > 0 || declinedDeals.length > 0) && (
                    <section>
                        <details className="group">
                            <summary className="flex items-center justify-between cursor-pointer list-none mb-4">
                                <h2 className="text-lg font-semibold text-gray-500">Past Deals ({completedDeals.length + declinedDeals.length})</h2>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="space-y-3 mt-4">
                                {completedDeals.map(deal => (
                                    <Card key={deal.id} padding="sm" className="opacity-75 cursor-pointer" onClick={() => navigate(`/deal/${deal.id}`)}>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="font-medium text-gray-700">{deal.brand_name}</span>
                                                <span className="text-xs text-gray-500 ml-2">• Completed</span>
                                            </div>
                                            <span className="text-sm font-semibold text-green-600">{formatCurrency(deal.budget)}</span>
                                        </div>
                                    </Card>
                                ))}
                                {declinedDeals.map(deal => (
                                    <Card key={deal.id} padding="sm" className="opacity-75 cursor-pointer" onClick={() => navigate(`/deal/${deal.id}`)}>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="font-medium text-gray-700">{deal.brand_name}</span>
                                                <span className="text-xs text-gray-500 ml-2">• Declined</span>
                                            </div>
                                            <span className="text-sm text-gray-500">{formatCurrency(deal.budget)}</span>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </details>
                    </section>
                )}

                {/* Quick Actions */}
                <section>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <Card hover className="text-center cursor-pointer" padding="md" onClick={() => copyLink()}>
                            <Copy className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Copy Link</p>
                        </Card>
                        <Card hover className="text-center cursor-pointer" padding="md" onClick={() => shareLink()}>
                            <Share2 className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Share Link</p>
                        </Card>
                    </div>
                </section>
            </main>
        </div>
    )
}