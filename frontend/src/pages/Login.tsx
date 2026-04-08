import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/Card'
import { Shield, ArrowRight } from 'lucide-react'
import { useStore } from '../store/useStore'
import { supabase } from '../lib/supabase'

export function Login() {
    const navigate = useNavigate()
    const { setUser, setIsLoading, isLoading } = useStore()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
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
            setError((err as Error).message || 'Failed to log in')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background-marketing flex flex-col">
            {/* Header */}
            <header className="bg-background-panel border-b border-border-subtle">
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
            <main className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-background-surface border-border-standard rounded-panel">
                    <CardHeader className="text-center">
                        <CardTitle className="text-text-primary">Welcome back, Creator!</CardTitle>
                        <CardDescription className="text-text-tertiary">
                            Sign in to manage your brand collaborations
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="bg-background-surface border-border-standard text-text-primary"
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
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
                            Log In
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </form>

                    <p className="text-center text-sm text-text-tertiary mt-6">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-brand-accent font-medium hover:underline">
                            Create account
                        </Link>
                    </p>
                </Card>
            </main>
        </div>
    )
}