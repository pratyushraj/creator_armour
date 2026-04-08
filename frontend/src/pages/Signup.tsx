import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/Card'
import { Shield, ArrowRight } from 'lucide-react'
import { useStore } from '../store/useStore'
import { supabase } from '../lib/supabase'

export function Signup() {
    const navigate = useNavigate()
    const { setUser, setIsLoading, isLoading } = useStore()
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
            // Sign up with Supabase
            const { data, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        name: formData.name,
                        instagram_handle: formData.instagramHandle.replace('@', ''),
                    },
                },
            })

            if (authError) {
                throw authError
            }

            if (data.user) {
                setUser({
                    id: data.user.id,
                    email: data.user.email || '',
                    name: data.user.user_metadata?.name || '',
                })
                navigate('/dashboard')
            }
        } catch (err) {
            setError((err as Error).message || 'Failed to create account')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background-marketing flex flex-col">
            {/* Header */}
            <header className="bg-background-panel border-b border-border-subtle relative z-10">
                <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-indigo rounded-comfortable flex items-center justify-center">
                            <Shield className="w-5 h-5 text-text-primary" />
                        </div>
                        <span className="text-xl font-medium text-text-primary">Creator Armour</span>
                    </Link>
                </div>
            </header>

            {/* Form */}
            <main className="flex-1 flex items-center justify-center p-4 relative z-10">
                <Card className="w-full max-w-md bg-background-surface border-border-standard rounded-panel animate-fade-in">
                    <CardHeader className="text-center">
                        <CardTitle className="text-text-primary">Create your creator profile</CardTitle>
                        <CardDescription className="text-text-tertiary">
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
                            className="bg-background-surface border-border-standard text-text-primary"
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="bg-background-surface border-border-standard text-text-primary"
                        />

                        <Input
                            label="Instagram Username"
                            placeholder="@yourhandle"
                            value={formData.instagramHandle}
                            onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                            required
                            helperText="Your collaboration link will be: creatorarmour.com/yourhandle"
                            className="bg-background-surface border-border-standard text-text-primary"
                        />

                        <Input
                            label="Password (8+ characters)"
                            type="password"
                            placeholder="•••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            minLength={8}
                            className="bg-background-surface border-border-standard text-text-primary"
                        />

                        {error && (
                            <p className="text-status-green text-sm text-center">{error}</p>
                        )}

                        <Button 
                            type="submit" 
                            fullWidth 
                            isLoading={isLoading} 
                            size="lg"
                            className="bg-brand-indigo hover:bg-brand-accent text-text-primary rounded-comfortable"
                        >
                            Get Started Free
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </form>

                    <p className="text-center text-sm text-text-tertiary mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-brand-accent font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                </Card>
            </main>
        </div>
    )
}