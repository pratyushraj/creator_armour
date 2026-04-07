import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/Card'
import { Shield, ArrowRight } from 'lucide-react'
import { useStore } from '../store/useStore'
import { fetchAPI } from '../lib/supabase'
import type { User, Creator } from '../types'

export function Login() {
    const navigate = useNavigate()
    const { setUser, setCreator, setIsLoading, isLoading } = useStore()
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
            const response = await fetchAPI<{ user: User; creator: Creator }>('/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData),
            })

            setUser(response.user)
            setCreator(response.creator)

            navigate('/dashboard')
        } catch (err) {
            setError((err as Error).message || 'Failed to log in')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-100">
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
            <main className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                    <CardTitle>Welcome back, Creator!</CardTitle>
                    <CardDescription>
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
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />

                        {error && (
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        )}

                        <Button type="submit" fullWidth isLoading={isLoading} size="lg">
                            Log In
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary-600 font-medium hover:underline">
                            Create account
                        </Link>
                    </p>
                </Card>
            </main>
        </div>
    )
}