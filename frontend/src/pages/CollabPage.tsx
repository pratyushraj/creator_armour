import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/Card'
import { Input, Textarea } from '../components/Input'
import { formatCurrency } from '../lib/utils'
import {
    Instagram,
    Users,
    TrendingUp,
    Check,
    CheckCircle,
    ArrowRight,
    Package,
    Mail,
    Shield
} from 'lucide-react'
import { fetchAPI } from '../lib/supabase'

interface CreatorProfile {
    id: string
    name: string
    instagram_handle: string
    bio?: string
    niche?: string
    audience_size?: number
    engagement_rate?: number
    packages?: Package[]
}

interface Package {
    id: string
    name: string
    description: string
    price: number
    deliverables: string
}

export function CollabPage() {
    const { handle } = useParams<{ handle: string }>()
    const [creator, setCreator] = useState<CreatorProfile | null>(null)
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
    // selectedPackage is used for tracking which package was selected
    void selectedPackage
    const [showOfferForm, setShowOfferForm] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [lastSubmissionTime, setLastSubmissionTime] = useState(0)
    const [formData, setFormData] = useState({
        brandName: '',
        email: '',
        deliverables: '',
        budget: '',
        deadline: '',
        notes: '',
    })

    useEffect(() => {
        // Fetch creator profile
        const fetchCreator = async () => {
            try {
                const data = await fetchAPI<CreatorProfile>(`/creators/${handle}`)
                setCreator(data)
            } catch (error) {
                console.error('Failed to fetch creator:', error)
            }
        }

        if (handle) {
            fetchCreator()
        }
    }, [handle])

    // Mock creator data for demo
    useEffect(() => {
        if (handle) {
            setCreator({
                id: '1',
                name: 'Sarah Johnson',
                instagram_handle: handle.replace(/-/g, ''),
                bio: 'Lifestyle & Beauty Creator | Sharing my journey through fashion, skincare, and everyday moments ✨',
                niche: 'Lifestyle & Beauty',
                audience_size: 125000,
                engagement_rate: 4.8,
                packages: [
                    {
                        id: '1',
                        name: 'Instagram Story',
                        description: '3 story slides with swipe-up link',
                        price: 150,
                        deliverables: '3 Instagram Story slides with link',
                    },
                    {
                        id: '2',
                        name: 'Instagram Reel',
                        description: '15-30 second branded video',
                        price: 500,
                        deliverables: '1 Instagram Reel (15-30s)',
                    },
                    {
                        id: '3',
                        name: 'Full Campaign',
                        description: 'Reel + 3 Stories + 1 Post',
                        price: 1000,
                        deliverables: '1 Reel, 3 Stories, 1 Feed Post',
                    },
                ],
            })
        }
    }, [handle])

    const handlePackageSelect = (packageId: string) => {
        setSelectedPackage(packageId)
        const pkg = creator?.packages?.find(p => p.id === packageId)
        if (pkg) {
            setFormData({
                ...formData,
                deliverables: pkg.deliverables,
                budget: pkg.price.toString(),
            })
        }
        setShowOfferForm(true)
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.brandName.trim()) {
            newErrors.brandName = 'Brand name is required'
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        if (!formData.deliverables.trim()) {
            newErrors.deliverables = 'Campaign details are required'
        }
        if (!formData.budget) {
            newErrors.budget = 'Budget is required'
        } else if (isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
            newErrors.budget = 'Please enter a valid amount'
        }
        if (!formData.deadline) {
            newErrors.deadline = 'Deadline is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Prevent rapid double-clicks (debounce: 2 seconds for forms)
        const now = Date.now()
        if (now - lastSubmissionTime < 2000) {
            return
        }
        setLastSubmissionTime(now)

        if (isSubmitting) return

        setIsSubmitting(true)
        setErrors({})

        if (!validateForm()) {
            setIsSubmitting(false)
            return
        }

        try {
            await fetchAPI('/offers', {
                method: 'POST',
                body: JSON.stringify({
                    creator_handle: handle,
                    brand_name: formData.brandName,
                    brand_email: formData.email,
                    deliverables: formData.deliverables,
                    amount: parseFloat(formData.budget),
                    deadline: formData.deadline,
                    notes: formData.notes,
                }),
            })
            setSubmitted(true)
        } catch (error) {
            console.error('Failed to submit offer:', error)
            alert('Failed to submit offer. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!creator) {
        return (
            <div className="min-h-screen bg-gradient-premium flex items-center justify-center">
                <p className="text-gray-500 animate-pulse">Loading...</p>
            </div>
        )
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-premium flex items-center justify-center p-4">
                <Card className="max-w-md text-center border-none shadow-xl glass animate-fade-in-up">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle>Offer Sent!</CardTitle>
                    <CardDescription className="mt-2">
                        Your offer has been sent to {creator.name}. They'll review it and get back to you soon.
                    </CardDescription>
                    <Button className="mt-6" variant="secondary" onClick={() => window.close()}>
                        Close
                    </Button>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-premium">
            {/* Header with Creator Info */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-24 border-b border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 pt-12 pb-6 relative z-10 animate-fade-in-up">
                    <div className="flex items-center gap-5">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white/10 shadow-glow relative">
                            {creator.name.charAt(0)}
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-slate-800">
                                <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-3xl font-bold tracking-tight">{creator.name}</h1>
                                <span className="flex items-center gap-1 text-blue-400" title="Verified Creator">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="text-sm font-medium">Verified</span>
                                </span>
                            </div>
                            <p className="text-slate-300 flex items-center gap-1.5 mt-1 font-medium">
                                <Instagram className="w-4 h-4" />
                                @{creator.instagram_handle}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 -mt-10 pb-20 space-y-6 relative z-10 animate-fade-in-up delay-100">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <Card padding="sm" variant="elevated" className="text-center group border-white">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                            <Users className="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors" />
                            <p className="text-2xl font-bold text-slate-900">
                                {(creator.audience_size || 0) >= 1000
                                    ? `${((creator.audience_size || 0) / 1000).toFixed(0)}K`
                                    : creator.audience_size
                                }
                            </p>
                        </div>
                        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Followers</p>
                    </Card>
                    <Card padding="sm" variant="elevated" className="text-center group border-white">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                            <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                            <p className="text-2xl font-bold text-slate-900">{creator.engagement_rate || 0}%</p>
                        </div>
                        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Engagement</p>
                    </Card>
                    <Card padding="sm" variant="elevated" className="text-center group border-white">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                            <Package className="w-4 h-4 text-slate-400 group-hover:text-violet-500 transition-colors" />
                            <p className="text-2xl font-bold text-slate-900">{creator.packages?.length || 0}</p>
                        </div>
                        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Services</p>
                    </Card>
                </div>

                {/* Trust Badge */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                Safe Collaboration
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                This creator is verified. All offers are managed through our secure platform 
                                with clear terms and payment protection for both parties.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Bio */}
                <Card variant="elevated" className="border-white">
                    <p className="text-gray-600">{creator.bio}</p>
                    {creator.niche && (
                        <div className="mt-4 flex items-center gap-2">
                            <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                                {creator.niche}
                            </span>
                        </div>
                    )}
                </Card>

                {/* Services */}
                <section>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Packages</h2>
                    <div className="space-y-3">
                        {creator.packages?.map((pkg) => (
                            <Card
                                key={pkg.id}
                                hover
                                variant="elevated"
                                onClick={() => handlePackageSelect(pkg.id)}
                                className="cursor-pointer group border-white"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <Package className="w-5 h-5 text-primary-600" />
                                            <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">{pkg.description}</p>
                                        <p className="text-sm text-gray-400 mt-2">{pkg.deliverables}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-primary-600">
                                            {formatCurrency(pkg.price)}
                                        </p>
                                        <ArrowRight className="w-5 h-5 text-gray-400 ml-auto mt-2" />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Custom Offer Form */}
                {showOfferForm && (
                    <Card className="border-primary-200">
                        <CardHeader>
                    <CardTitle>Send Collaboration Offer</CardTitle>
                    <CardDescription>
                        Describe your campaign. Your offer will be sent directly to {creator.name}.
                    </CardDescription>
                        </CardHeader>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Input
                                    label="Your Brand Name"
                                    placeholder="e.g., Glow Skincare"
                                    value={formData.brandName}
                                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                                    required
                                />
                                {errors.brandName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.brandName}</p>
                                )}
                            </div>

                            <div>
                                <Input
                                    label="Your Email"
                                    type="email"
                                    placeholder="you@yourbrand.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <Textarea
                                    label="Campaign Details"
                                    placeholder="Describe what content you need (e.g., 1 Instagram Reel about skincare routine)"
                                    value={formData.deliverables}
                                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                                    required
                                    rows={3}
                                />
                                {errors.deliverables && (
                                    <p className="text-red-500 text-xs mt-1">{errors.deliverables}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Input
                                        label="Budget (₹)"
                                        type="number"
                                        placeholder="5,000"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        required
                                    />
                                    {errors.budget && (
                                        <p className="text-red-500 text-xs mt-1">{errors.budget}</p>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        label="Deadline"
                                        type="date"
                                        value={formData.deadline}
                                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                    />
                                    {errors.deadline && (
                                        <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
                                    )}
                                </div>
                            </div>

                            <Textarea
                                label="Additional Notes (Optional)"
                                placeholder="Any specific requirements, brand guidelines, or timeline details..."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                rows={3}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                isLoading={isSubmitting}
                            >
                                Send Offer to {creator.name}
                                <Mail className="w-4 h-4 ml-2" />
                            </Button>

                            <p className="text-xs text-gray-400 text-center">
                                Your offer will be sent directly to {creator.name}'s dashboard
                            </p>
                        </form>
                    </Card>
                )}

                {/* Custom Offer CTA */}
                {!showOfferForm && (
                    <Card className="text-center">
                        <p className="text-gray-600 mb-4">Need something different?</p>
                        <Button variant="secondary" onClick={() => setShowOfferForm(true)}>
                            Send Custom Offer
                        </Button>
                    </Card>
                )}
            </main>
        </div>
    )
}