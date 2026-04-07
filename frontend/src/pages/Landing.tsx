import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Card } from '../components/Card'
import { ArrowRight, Shield, Star, Rocket, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'

export function Landing() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const handleGetStarted = (e: React.FormEvent) => {
        e.preventDefault()
        navigate('/signup', { state: { email } })
    }

    return (
        <div className="min-h-screen bg-gradient-premium">
            {/* Header */}
            <header className="sticky top-0 z-50 glass border-b border-gray-100/50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl flex items-center justify-center shadow-glow">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">Creator Armour</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" onClick={() => navigate('/brand/dashboard')}>
                            For Brands
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                            Log in
                        </Button>
                        <Button size="sm" onClick={() => navigate('/signup')}>
                            Sign up
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-slate-200/50 shadow-lg animate-fade-in">
                    <Sparkles className="w-5 h-5 text-slate-600" />
                    <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent font-semibold">Trusted by 10,000+ Indian creators</span>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-8 leading-tight tracking-tight animate-fade-in-up">
                    Get brand deals
                    <br />
                    <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">without the confusion</span>
                </h1>

                <p className="text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100">
                    Stop confusing DMs. Get clear brand offers. Get paid on time, every time.
                </p>

                <div className="flex items-center justify-center gap-8 mb-12 animate-fade-in-up delay-200">
                    <div className="flex items-center gap-4 text-slate-600">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Free to Start</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-600">
                        <Rocket className="w-5 h-5" />
                        <span className="text-sm font-medium">Setup in 60 seconds</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-600">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="text-sm font-medium">Safe Payments</span>
                    </div>
                </div>

                <form onSubmit={handleGetStarted} className="max-w-lg mx-auto flex gap-4 mb-20 animate-fade-in-up delay-300">
                    <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-6 py-4 text-lg border-slate-200/50 rounded-xl focus:ring-4 focus:ring-slate-200/50 focus:border-slate-400 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                     <Button type="submit" size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white shadow-xl">
                         Get Started Free
                         <ArrowRight className="w-5 h-5 ml-3" />
                     </Button>
                </form>

                <div className="text-sm text-slate-500 mb-16 animate-fade-in-up delay-400">
                    🔒 Safe & Secure • No credit card required • Free to start • 24/7 Support
                </div>

                {/* Hero Image */}
                <div className="relative max-w-5xl mx-auto animate-fade-in-up delay-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-slate-500/20 blur-3xl rounded-full opacity-30"></div>
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-700 rounded-3xl p-2 shadow-2xl">
                        <div className="bg-white rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop"
                                alt="Creator Armour Dashboard"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto px-6 py-24">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16 tracking-tight">
                    Why creators love us
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <Card hover variant="elevated" className="text-center p-10 bg-gradient-to-br from-white to-slate-50/50 group">
                        <div className="w-20 h-20 bg-gradient-to-r from-slate-900 to-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-105 transition-transform duration-300">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">Safe & Secure</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Get paid on time</h3>
                        <p className="text-slate-600 leading-relaxed mb-8">
                            No more chasing brands for money. We track every payment and send reminders automatically.
                        </p>
                        <div className="flex justify-center gap-2">
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded">Payment Tracking</span>
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded">Auto Reminders</span>
                        </div>
                    </Card>

                    <Card hover variant="elevated" className="text-center p-10 bg-gradient-to-br from-white to-slate-50/50 group">
                        <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-105 transition-transform duration-300">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">Easy Setup</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Brands find you</h3>
                        <p className="text-slate-600 leading-relaxed mb-8">
                            Share your collaboration link in your Instagram bio. Quality brands will send you clear offers directly.
                        </p>
                        <div className="flex justify-center gap-2">
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs rounded">Custom Link</span>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs rounded">Direct Offers</span>
                        </div>
                    </Card>

                    <Card hover variant="elevated" className="text-center p-10 bg-gradient-to-br from-white to-slate-50/50 group">
                        <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-105 transition-transform duration-300">
                            <TrendingUp className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="px-4 py-2 bg-violet-100 text-violet-700 text-sm font-medium rounded-full">Grow Earnings</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Know your worth</h3>
                        <p className="text-slate-600 leading-relaxed mb-8">
                            See what other creators with similar followers charge. Price your work confidently and earn more.
                        </p>
                        <div className="flex justify-center gap-2">
                            <span className="px-3 py-1 bg-violet-100 text-violet-600 text-xs rounded">Price Guide</span>
                            <span className="px-3 py-1 bg-violet-100 text-violet-600 text-xs rounded">+40% Avg. Earnings</span>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Premium Stats Section */}
            <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-16 text-white text-center mb-20 border border-slate-700/50 shadow-2xl">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Enterprise Performance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="group hover:scale-105 transition-transform duration-300">
                            <div className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                                10,000+
                            </div>
                            <div className="text-slate-300 text-lg font-medium">Premium Creators</div>
                            <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full mx-auto mt-4"></div>
                        </div>
                        <div className="group hover:scale-105 transition-transform duration-300">
                            <div className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                                ₹50M+
                            </div>
                            <div className="text-slate-300 text-lg font-medium">Revenue Generated</div>
                            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full mx-auto mt-4"></div>
                        </div>
                        <div className="group hover:scale-105 transition-transform duration-300">
                            <div className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                                98%
                            </div>
                            <div className="text-slate-300 text-lg font-medium">Client Satisfaction</div>
                            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-purple-300 rounded-full mx-auto mt-4"></div>
                        </div>
                        <div className="group hover:scale-105 transition-transform duration-300">
                            <div className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                                24h
                            </div>
                            <div className="text-slate-300 text-lg font-medium">Response Time</div>
                            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full mx-auto mt-4"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Indian Creator Testimonials */}
            <section className="max-w-6xl mx-auto px-6 py-24">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16 tracking-tight">
                    Trusted by India's Top Creators
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            name: 'Ananya Iyer',
                            role: 'Fashion & Tech',
                            followers: '850K',
                            quote: "Creator Armour removed the 'guesswork' from my brand deals. I finally know what to charge and when I'll get paid.",
                            tags: ['Verified', 'Mumbai']
                        },
                        {
                            name: 'Rohan Mehta',
                            role: 'Travel & Lifestyle',
                            followers: '1.2M',
                            quote: "The brand link is a game changer. I just put it in my bio and clear offers start coming in. No more messy DMs.",
                            tags: ['Premium', 'Delhi']
                        },
                        {
                            name: 'Priya Sharma',
                            role: 'Beauty & Wellness',
                            followers: '2M',
                            quote: "Its enterprise security and revenue tools increased my earnings by 60%. Reducing admin work by 80% was the bonus.",
                            tags: ['Enterprise', 'Bangalore']
                        }
                    ].map((t, i) => (
                        <Card key={i} hover variant="elevated" className="p-8 bg-white border border-slate-100 relative group">
                            <div className="flex mb-6">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <blockquote className="text-slate-700 mb-8 leading-relaxed italic">
                                "{t.quote}"
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center text-white font-bold">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{t.name}</div>
                                    <div className="text-xs text-slate-500">{t.role} • {t.followers}</div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-6">
                                {t.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Brand Logos (Simulated) */}
                <div className="mt-20 pt-10 border-t border-slate-100 text-center">
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-[0.2em] mb-12">Trusted by Global Brands</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">NYKAA</span>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">ZOMATO</span>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">MAMA EARTH</span>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">BOAT</span>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">LENSKART</span>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-white py-24 border-y border-gray-100">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16 tracking-tight">
                        How it works
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: '1', title: 'Create your profile', desc: 'Sign up and set up your creator profile with your Instagram handle. Takes less than 60 seconds.' },
                            { step: '2', title: 'Get your brand link', desc: 'Youll get a unique link to share in your Instagram bio. Brands use this to send you clear offers.' },
                            { step: '3', title: 'Receive clear offers', desc: 'Brands send structured offers with budget, deliverables, and deadlines. No more confusing DMs.' },
                            { step: '4', title: 'Track & get paid', desc: 'Accept offers, track progress, submit your work, and get paid on time. Simple!' },
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 text-white rounded-3xl flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="max-w-6xl mx-auto px-6 py-24 text-center">
                <div className="inline-flex items-center gap-4 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 px-8 py-4 rounded-full text-lg font-medium mb-8 border border-slate-200/50 shadow-lg">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Join 10,000+ Indian creators</span>
                </div>
                
                <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">Start getting clear brand offers today</h2>
                <p className="text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Stop chasing brands for payments. Get structured offers, track your work, and earn more from your Instagram.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                    <Button size="lg" className="text-lg px-12 py-6 bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white shadow-xl group">
                        Get Started Free
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                    <Button variant="ghost" size="lg" className="text-lg px-12 py-6 text-slate-600 border-2 border-slate-200/50 hover:border-slate-300/50 hover:text-slate-900 transition-all duration-300">
                        See How It Works
                    </Button>
                </div>
                
                <div className="flex justify-center gap-8 mt-12 text-sm text-slate-500">
                    <span>🔒 Safe & Secure</span>
                    <span>• Free to start</span>
                    <span>• No credit card</span>
                    <span>• 24/7 Support</span>
                </div>
                
                <div className="mt-12 text-slate-400 text-sm">
                    Trusted by creators across India — Mumbai, Delhi, Bangalore, Hyderabad & more
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-950 text-gray-400 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center gap-2.5 mb-6">
                        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
                            <Shield className="w-5 h-5 text-primary-600" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Creator Armour</span>
                    </div>
                    <div className="flex flex-wrap gap-6 mb-6 text-sm">
                        <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="mailto:support@creatorarmour.com" className="hover:text-white transition-colors">Support</a>
                    </div>
                    <p className="text-sm text-gray-500">
                        © 2026 Creator Armour. Built for creators, by creators. Made with ❤️ in India
                    </p>
                </div>
            </footer>
        </div>
    )
}