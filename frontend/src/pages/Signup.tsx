import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/Card'
import { Shield, ArrowRight } from 'lucide-react'
import { useStore } from '../store/useStore'
import { fetchAPI } from '../lib/supabase'
import type { User, Creator } from '../types'

export function Signup() {
    const navigate = useNavigate()
    const { setUser, setCreator, setIsLoading, isLoading } = useStore()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        instagramHandle: '',
    })
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // Basic validation
        if (!formData.name.trim()) {
            setError('Please enter your name')
            setIsLoading(false)
            return
        }
        if (!formData.instagramHandle.trim()) {
            setError('Please enter your Instagram username')
            setIsLoading(false)
            return
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email address')
            setIsLoading(false)
            return
        }
        if (!formData.password || formData.password.length < 8) {
            setError('Password must be at least 8 characters long')
            setIsLoading(false)
            return
        }

        try {
            // Call backend API to create account
            const response = await fetchAPI('/auth/signup', {
                method: 'POST',
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    instagram_handle: formData.instagramHandle.replace('@', ''),
                }),
            })

            // Store user data
            const data = response as { user: User; creator: Creator }
            setUser(data.user)
            setCreator(data.creator)

            navigate('/dashboard')
        } catch (err) {
            setError((err as Error).message || 'Failed to create account')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-premium flex flex-col">
            {/* Header */}
            <header className="glass border-b border-gray-100/50 relative z-10">
                <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">Creator Armour</span>
                    </Link>
                </div>
            </header>

            {/* Form */}
            <main className="flex-1 flex items-center justify-center p-4 relative z-10">
                <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
                <Card className="w-full max-w-md animate-fade-in-up border-none shadow-xl glass">
                    <CardHeader className="text-center">
                    <CardTitle>Create your creator profile</CardTitle>
                    <CardDescription>
                        Get your brand collaboration link in 60 seconds
                    </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Your Name"
                            placeholder="e.g., Priya Sharma"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />

                        <Input
                            label="Instagram Username"
                            placeholder="@yourhandle"
                            value={formData.instagramHandle}
                            onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                            required
                            helperText="Your collaboration link will be: creatorarmour.com/yourhandle"
                        />

                        <Input
                            label="Password (8+ characters)"
                            type="password"
                            placeholder="•••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            minLength={8}
                        />

                        {error && (
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        )}

                        <Button type="submit" fullWidth isLoading={isLoading} size="lg">
                            Get Started Free
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary-600 font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                </Card>
            </main>
        </div>
    )
}