import { Card, CardTitle, CardDescription } from '../components/Card'
import { Bell } from 'lucide-react'

export function Notifications() {
    return (
        <div className="min-h-screen bg-gradient-premium pb-24">
            <header className="sticky top-0 z-40 glass border-b border-gray-100/50 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-primary-600" />
                        <h1 className="font-semibold text-gray-900">Notifications</h1>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in-up">
                <Card className="text-center py-16 bg-white/50">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bell className="w-8 h-8 text-primary-400" />
                    </div>
                    <CardTitle className="mb-2">All Caught Up!</CardTitle>
                    <CardDescription>
                        You don't have any new notifications. We'll alert you when a brand sends an offer or processes a payment.
                    </CardDescription>
                </Card>
            </main>
        </div>
    )
}
