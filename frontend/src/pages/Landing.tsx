import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { ArrowRight, Shield, Star, Link2, Share2, Inbox, Wallet, TrendingUp, Users } from 'lucide-react'

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
        <div className="min-h-screen bg-background-marketing">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-panel border-b border-border-subtle">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-indigo rounded-comfortable flex items-center justify-center">
                            <Shield className="w-4 h-4 text-text-primary" />
                        </div>
                        <span className="text-lg font-medium text-text-primary">Creator Armour</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="text-text-secondary hover:text-text-primary">
                            Log in
                        </Button>
                        <Button size="sm" onClick={() => navigate('/signup')} className="bg-brand-indigo hover:bg-brand-accent text-text-primary">
                            Sign up
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-4 py-20 md:py-24 text-center">
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 bg-background-surface border border-border-standard rounded-pill px-4 py-2 text-caption font-medium mb-8">
                    <Users className="w-4 h-4 text-brand-accent" />
                    <span className="text-text-secondary">Trusted by 10,000+ creators</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-display font-medium text-text-primary mb-6">
                    Get brand deals<br />
                    <span className="text-brand-accent">without DMs</span>
                </h1>

                {/* Subtitle */}
                <p className="text-body-lg text-text-tertiary mb-8 max-w-2xl mx-auto">
                    Send one link. Brands send offers.
                </p>

                {/* Trust Line */}
                <p className="text-caption text-text-quaternary mb-10">
                    Free to start • Takes 30 seconds
                </p>

                {/* Primary CTA */}
                <div className="max-w-md mx-auto mb-12">
                    <Button
                        size="lg"
                        onClick={() => navigate('/signup')}
                        className="w-full md:w-auto text-body font-medium px-8 py-5 bg-brand-indigo hover:bg-brand-accent text-text-primary rounded-comfortable shadow-elevated"
                    >
                        Create your link
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 text-caption text-text-quaternary mb-16">
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
                    <div className="absolute inset-0 bg-brand-indigo/10 blur-3xl rounded-full opacity-20"></div>
                    <div className="relative bg-background-surface rounded-panel overflow-hidden border border-border-standard shadow-elevated">
                        <img
                            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop"
                            alt="Creator Armour Dashboard"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="max-w-6xl mx-auto px-4 py-20">
                <h2 className="text-h1 font-medium text-center text-text-primary mb-16">
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
                            <div className="w-14 h-14 md:w-16 md:h-16 bg-background-surface border border-border-standard rounded-panel flex items-center justify-center mx-auto mb-4 group-hover:bg-background-secondary transition-colors duration-300">
                                <item.icon className="w-7 h-7 md:w-8 md:h-8 text-brand-accent" />
                            </div>
                            <h3 className="text-h3 font-medium text-text-primary mb-2">{item.title}</h3>
                            <p className="text-caption text-text-tertiary">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits */}
            <section className="max-w-6xl mx-auto px-4 py-20">
                <h2 className="text-h1 font-medium text-center text-text-primary mb-16">
                    Why creators love us
                </h2>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    <Card className="text-center p-8 bg-background-surface border border-border-standard rounded-panel">
                        <div className="w-16 h-16 bg-status-emerald/10 rounded-panel flex items-center justify-center mx-auto mb-6">
                            <Wallet className="w-8 h-8 text-status-emerald" />
                        </div>
                        <h3 className="text-h3 font-medium text-text-primary mb-3">Get paid on time</h3>
                        <p className="text-body-sm text-text-tertiary">
                            No more chasing brands for money. We track every payment automatically.
                        </p>
                    </Card>

                    <Card className="text-center p-8 bg-background-surface border border-border-standard rounded-panel">
                        <div className="w-16 h-16 bg-brand-indigo/10 rounded-panel flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8 text-brand-accent" />
                        </div>
                        <h3 className="text-h3 font-medium text-text-primary mb-3">Brands come to you</h3>
                        <p className="text-body-sm text-text-tertiary">
                            Share your link in your bio. Quality brands send clear offers directly.
                        </p>
                    </Card>

                    <Card className="text-center p-8 bg-background-surface border border-border-standard rounded-panel">
                        <div className="w-16 h-16 bg-brand-accent/10 rounded-panel flex items-center justify-center mx-auto mb-6">
                            <TrendingUp className="w-8 h-8 text-brand-accent" />
                        </div>
                        <h3 className="text-h3 font-medium text-text-primary mb-3">Know your worth</h3>
                        <p className="text-body-sm text-text-tertiary">
                            See what similar creators charge. Price confidently and earn more.
                        </p>
                    </Card>
                </div>
            </section>

            {/* Social Proof - Stats */}
            <section className="bg-background-panel rounded-large p-12 md:p-16 text-center border border-border-subtle">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-h1 font-medium mb-12 text-text-primary">Trusted by creators</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-display font-medium text-text-primary mb-2">10,000+</div>
                            <div className="text-caption text-text-tertiary">Creators</div>
                        </div>
                        <div>
                            <div className="text-display font-medium text-text-primary mb-2">₹50M+</div>
                            <div className="text-caption text-text-tertiary">Earned</div>
                        </div>
                        <div>
                            <div className="text-display font-medium text-text-primary mb-2">98%</div>
                            <div className="text-caption text-text-tertiary">Satisfaction</div>
                        </div>
                        <div>
                            <div className="text-display font-medium text-text-primary mb-2">24h</div>
                            <div className="text-caption text-text-tertiary">Response</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="max-w-6xl mx-auto px-4 py-20">
                <h2 className="text-h1 font-medium text-center text-text-primary mb-12">
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
                        <Card key={i} className="p-6 bg-background-surface border border-border-standard rounded-panel">
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 text-status-emerald fill-status-emerald" />
                                ))}
                            </div>
                            <blockquote className="text-body-sm text-text-secondary mb-6 leading-relaxed">
                                "{t.quote}"
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-indigo rounded-full flex items-center justify-center text-text-primary font-medium text-sm">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-label font-medium text-text-primary">{t.name}</div>
                                    <div className="text-micro text-text-quaternary">{t.role} • {t.followers}</div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Brand Logos */}
                <div className="mt-16 pt-10 border-t border-border-subtle text-center">
                    <p className="text-micro font-medium text-text-quaternary uppercase tracking-widest mb-8">Trusted by brands</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
                        <span className="text-xl md:text-2xl font-medium text-text-tertiary">NYKAA</span>
                        <span className="text-xl md:text-2xl font-medium text-text-tertiary">ZOMATO</span>
                        <span className="text-xl md:text-2xl font-medium text-text-tertiary">MAMA EARTH</span>
                        <span className="text-xl md:text-2xl font-medium text-text-tertiary">BOAT</span>
                        <span className="text-xl md:text-2xl font-medium text-text-tertiary">LENSKART</span>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h2 className="text-h1 font-medium text-text-primary mb-6">
                    Start getting brand deals today
                </h2>
                <p className="text-body-lg text-text-tertiary mb-10 max-w-2xl mx-auto">
                    Send one link. Get clear brand deals.
                </p>
                <Button
                    size="lg"
                    onClick={() => navigate('/signup')}
                    className="text-body font-medium px-8 py-5 bg-brand-indigo hover:bg-brand-accent text-text-primary rounded-comfortable shadow-elevated"
                >
                    Create your link
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-caption text-text-quaternary mt-6">
                    Free forever • No credit card required
                </p>
            </section>

            {/* Footer */}
            <footer className="bg-background-panel border-t border-border-subtle text-text-quaternary py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-text-primary rounded-comfortable flex items-center justify-center">
                            <Shield className="w-4 h-4 text-background-marketing" />
                        </div>
                        <span className="text-lg font-medium text-text-primary">Creator Armour</span>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-6 text-caption">
                        <a href="/terms" className="hover:text-text-primary transition-colors">Terms</a>
                        <a href="/privacy" className="hover:text-text-primary transition-colors">Privacy</a>
                        <a href="mailto:support@creatorarmour.com" className="hover:text-text-primary transition-colors">Support</a>
                    </div>
                    <p className="text-micro">
                        © 2026 Creator Armour. Made with ❤️ in India
                    </p>
                </div>
            </footer>

            {/* Sticky Mobile CTA */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-panel border-t border-border-standard z-50">
                    <Button
                        size="lg"
                        onClick={() => navigate('/signup')}
                        className="w-full py-4 text-body font-medium bg-brand-indigo hover:bg-brand-accent text-text-primary rounded-comfortable"
                    >
                        Create your link
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            )}
        </div>
    )
}