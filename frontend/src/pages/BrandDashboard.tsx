import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/Card'
import { formatCurrency } from '../lib/utils'
import {
    Send,
    Clock,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    Users,
    Package,
    Search,
    Filter,
    Plus,
    ArrowUpRight,
    LogOut,
    Briefcase
} from 'lucide-react'

interface BrandOffer {
    id: string
    creator_name: string
    creator_handle: string
    creator_avatar: string
    status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'rejected'
    budget: number
    deliverables: string
    deadline: string
    created_at: string
    platform: string
}

export function BrandDashboard() {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    // Mock data for demo
    const mockOffers: BrandOffer[] = [
        {
            id: '1',
            creator_name: 'Priya Sharma',
            creator_handle: 'priyabeauty',
            creator_avatar: 'PS',
            status: 'in_progress',
            budget: 15000,
            deliverables: '1 Instagram Reel + 3 Stories',
            deadline: '2024-02-15',
            created_at: '2024-01-20',
            platform: 'Instagram'
        },
        {
            id: '2',
            creator_name: 'Rohan Mehta',
            creator_handle: 'rohantravels',
            creator_avatar: 'RM',
            status: 'pending',
            budget: 25000,
            deliverables: '2 Posts + 1 Reel',
            deadline: '2024-02-28',
            created_at: '2024-01-25',
            platform: 'Instagram'
        },
        {
            id: '3',
            creator_name: 'Ananya Iyer',
            creator_handle: 'ananya.fashion',
            creator_avatar: 'AI',
            status: 'completed',
            budget: 30000,
            deliverables: 'Full Campaign (Reel + 5 Stories + 2 Posts)',
            deadline: '2024-01-15',
            created_at: '2024-01-01',
            platform: 'Instagram'
        },
        {
            id: '4',
            creator_name: 'Vikram Patel',
            creator_handle: 'vikram.tech',
            creator_avatar: 'VP',
            status: 'accepted',
            budget: 20000,
            deliverables: 'Product Review Reel',
            deadline: '2024-02-20',
            created_at: '2024-01-22',
            platform: 'Instagram'
        },
    ]

    const filteredOffers = mockOffers.filter(offer => {
        const matchesSearch = offer.creator_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            offer.creator_handle.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === 'all' || offer.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const stats = {
        totalSpent: mockOffers.reduce((sum, o) => sum + o.budget, 0),
        activeCampaigns: mockOffers.filter(o => ['pending', 'accepted', 'in_progress'].includes(o.status)).length,
        completedCampaigns: mockOffers.filter(o => o.status === 'completed').length,
        avgEngagement: 4.8
    }

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            accepted: 'bg-blue-100 text-blue-800',
            in_progress: 'bg-purple-100 text-purple-800',
            completed: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        }
        return colors[status] || 'bg-gray-100 text-gray-800'
    }

    const getStatusLabel = (status: string) => {
        const labels: Record<string, string> = {
            pending: 'Awaiting Response',
            accepted: 'Accepted',
            in_progress: 'Work in Progress',
            completed: 'Completed',
            rejected: 'Declined'
        }
        return labels[status] || status
    }

    return (
        <div className="min-h-screen bg-gradient-premium pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 glass border-b border-gray-100/50 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                            B
                        </div>
                        <div>
                            <h1 className="font-semibold text-gray-900">Your Brand</h1>
                            <p className="text-sm text-gray-500">Brand Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => navigate('/collab/find')}>
                            <Search className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card padding="sm" variant="elevated" className="text-center group border-white">
                        <p className="text-3xl font-bold text-slate-900">{stats.activeCampaigns}</p>
                        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">Active Campaigns</p>
                    </Card>
                    <Card padding="sm" variant="elevated" className="text-center group border-white">
                        <p className="text-3xl font-bold text-slate-900">{formatCurrency(stats.totalSpent)}</p>
                        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">Total Spent</p>
                    </Card>
                    <Card padding="sm" variant="elevated" className="text-center group border-white">
                        <p className="text-3xl font-bold text-slate-900">{stats.completedCampaigns}</p>
                        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">Completed</p>
                    </Card>
                    <Card padding="sm" variant="elevated" className="text-center group border-white">
                        <p className="text-3xl font-bold text-slate-900">{stats.avgEngagement}%</p>
                        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">Avg. Engagement</p>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Your Campaigns</h2>
                    <Button onClick={() => navigate('/collab/find')}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Campaign
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search creators..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['all', 'pending', 'in_progress', 'completed'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    statusFilter === status
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                {status === 'all' ? 'All' : getStatusLabel(status)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Offers List */}
                <div className="space-y-4">
                    {filteredOffers.map((offer) => (
                        <Card
                            key={offer.id}
                            hover
                            variant="elevated"
                            className="cursor-pointer group border-white"
                            onClick={() => navigate(`/brand/deal/${offer.id}`)}
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                    {offer.creator_avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-gray-900 truncate">{offer.creator_name}</h3>
                                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getStatusColor(offer.status)}`}>
                                            {getStatusLabel(offer.status)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">@{offer.creator_handle} • {offer.platform}</p>
                                    <p className="text-sm text-gray-600 mt-2">{offer.deliverables}</p>
                                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                                        <span className="font-semibold text-primary-600">
                                            {formatCurrency(offer.budget)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            Due {new Date(offer.deadline).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            </div>
                        </Card>
                    ))}

                    {filteredOffers.length === 0 && (
                        <Card className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Briefcase className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium">No campaigns found</p>
                            <p className="text-gray-400 text-sm mt-1">Start your first campaign by finding creators</p>
                            <Button className="mt-4" onClick={() => navigate('/collab/find')}>
                                Find Creators
                            </Button>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    )
}