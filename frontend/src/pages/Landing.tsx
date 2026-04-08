import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { ArrowRight, Shield, Star, Link2, Share2, Inbox, Wallet, TrendingUp, Users, Zap } from 'lucide-react'

export function Landing() {
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-premium">
            {/* Header */}
            <header className="sticky top-0 z-50 glass border-b border-gray-100/50">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-gray-900">Creator Armour</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                            Log in
                        </Button>
                        <Button size="sm" onClick={() => navigate('/signup')}>
                            Sign up
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section - Simplified */}
            <section className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-8 border border-gray-200/50 shadow-sm">
                    <Users className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-700">Trusted by 10,000+ creators</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                    Get brand deals<br />
                    <span className="text-primary-600">without DMs</span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Send one link. Brands send offers.
                </p>

                {/* Trust Line */}
                <p className="text-sm text-gray-500 mb-10">
                    Free to start • Takes 30 seconds
                </p>

                {/* Primary CTA */}
                <div className="max-w-md mx-auto mb-12">
                    <Button
                        size="lg"
                        onClick={() => navigate('/signup')}
                        className="w-full md:w-auto text-lg px-8 py-5 shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                        Create your link
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-16">
                    <span className="flex items-center gap-1">
                        <Shield className="w-4 h-4" /> No credit card
                    </span>
                    <span>•</span>
                    <span>Free forever for creators</span>
                    <span>•</span>
                    <span>Used by 10,000+ creators</span>
                </div>

                {/* Hero Image */}
                <div className="relative max-w-3xl mx-auto">
                    <div className="absolute inset-0 bg-primary-500/10 blur-3xl rounded-full opacity-30"></div>
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                        <img
                            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop"
                            alt="Creator Armour Dashboard"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </section>

            {/* How It Works - Simplified */}
            <section className="max-w-6xl mx-auto px-4 py-20">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
                    How it works
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {[
                        { icon: Link2, title: 'Create your link', desc: 'Set up in 30 seconds' },
                        { icon: Share2, title: 'Share with brands', desc: 'Add to your bio' },
                        { icon: Inbox, title: 'Get offers', desc: 'Clear proposals' },
                        { icon: Wallet, title: 'Get paid', desc: 'On time, every time' },
                    ].map((item, i) => (
                        <div key={i} className="text-center group">
                            <div className="w-14 h-14 md:w-16 md:h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits - 3 Cards */}
            <section className="max-w-6xl mx-auto px-4 py-20">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
                    Why creators love us
                </h2>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    <Card hover variant="elevated" className="text-center p-8 bg-white">
                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Wallet className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Get paid on time</h3>
                        <p className="text-gray-600">
                            No more chasing brands for money. We track every payment automatically.
                        </p>
                    </Card>

                    <Card hover variant="elevated" className="text-center p-8 bg-white">
                        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Brands come to you</h3>
                        <p className="text-gray-600">
                            Share your link in your bio. Quality brands send clear offers directly.
                        </p>
                    </Card>

                    <Card hover variant="elevated" className="text-center p-8 bg-white">
                        <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <TrendingUp className="w-8 h-8 text-violet-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Know your worth</h3>
                        <p className="text-gray-600">
                            See what similar creators charge. Price confidently and earn more.
                        </p>
                    </Card>
                </div>
            </section>

            {/* Social Proof - Stats */}
            <section className="bg-gray-900 rounded-3xl p-12 md:p-16 text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Trusted by creators</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">10,000+</div>
                            <div className="text-gray-400">Creators</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">₹50M+</div>
                            <div className="text-gray-400">Earned</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
                            <div className="text-gray-400">Satisfaction</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">24h</div>
                            <div className="text-gray-400">Response</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="max-w-6xl mx-auto px-4 py-20">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                    Loved by creators
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            name: 'Ananya Iyer',
                            role: 'Fashion & Tech',
                            followers: '850K',
                            quote: "Creator Armour removed the guesswork from my brand deals. I finally know what to charge.",
                        },
                        {
                            name: 'Rohan Mehta',
                            role: 'Travel & Lifestyle',
                            followers: '1.2M',
                            quote: "The brand link is a game changer. Clear offers start coming in. No more messy DMs.",
                        },
                        {
                            name: 'Priya Sharma',
                            role: 'Beauty & Wellness',
                            followers: '2M',
                            quote: "My earnings increased by 60%. Reducing admin work by 80% was the bonus.",
                        },
                    ].map((t, i) => (
                        <Card key={i} hover variant="elevated" className="p-6 bg-white">
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <blockquote className="text-gray-700 mb-6 text-sm leading-relaxed">
                                "{t.quote}"
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                                    <div className="text-xs text-gray-500">{t.role} • {t.followers}</div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Brand Logos */}
                <div className="mt-16 pt-10 border-t border-gray-100 text-center">
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Trusted by brands</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale">
                        <span className="text-xl md:text-2xl font-black text-gray-900">NYKAA</span>
                        <span className="text-xl md:text-2xl font-black text-gray-900">ZOMATO</span>
                        <span className="text-xl md:text-2xl font-black text-gray-900">MAMA EARTH</span>
                        <span className="text-xl md:text-2xl font-black text-gray-900">BOAT</span>
                        <span className="text-xl md:text-2xl font-black text-gray-900">LENSKART</span>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Start getting brand deals today
                </h2>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Send one link. Get clear brand deals.
                </p>
                <Button
                    size="lg"
                    onClick={() => navigate('/signup')}
                    className="text-lg px-8 py-5 shadow-xl"
                >
                    Create your link
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm text-gray-500 mt-6">
                    Free forever • No credit card required
                </p>
            </section>

            {/* Footer */}
            <footer className="bg-gray-950 text-gray-400 py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <Shield className="w-4 h-4 text-primary-600" />
                        </div>
                        <span className="text-lg font-bold text-white">Creator Armour</span>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-6 text-sm">
                        <a href="/terms" className="hover:text-white transition-colors">Terms</a>
                        <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
                        <a href="mailto:support@creatorarmour.com" className="hover:text-white transition-colors">Support</a>
                    </div>
                    <p className="text-sm text-gray-500">
                        © 2026 Creator Armour. Made with ❤️ in India
                    </p>
                </div>
            </footer>

            {/* Sticky Mobile CTA */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50">
                    <Button
                        size="lg"
                        onClick={() => navigate('/signup')}
                        className="w-full py-4 text-lg shadow-lg"
                    >
                        Create your link
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            )}
        </div>
    )
}