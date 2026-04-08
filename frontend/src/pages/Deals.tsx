import { Card, CardHeader, CardTitle, CardDescription } from '../components/Card'
import { Briefcase } from 'lucide-react'

export function Deals() {
    return (
        <div className="min-h-screen bg-gradient-premium pb-24">
            <header className="sticky top-0 z-40 glass border-b border-gray-100/50 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-primary-600" />
                        <h1 className="font-semibold text-gray-900">Deals & Offers</h1>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in-up">
                <Card className="text-center py-16 bg-white/50">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-primary-400" />
                    </div>
                    <CardTitle className="mb-2">Your Deals Space</CardTitle>
                    <CardDescription>
                        All your active, pending, and past collaborations will appear here.
                        Share your Collab Link to start receiving offers!
                    </CardDescription>
                </Card>
            </main>
        </div>
    )
}
