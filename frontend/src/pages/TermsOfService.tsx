import { Link } from 'react-router-dom'
import { Shield, ArrowLeft } from 'lucide-react'
import { Button } from '../components/Button'

export function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">Creator Armour</span>
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back to home
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
                    <p className="text-gray-500">Last updated: July 4, 2026</p>
                </div>

                <div className="bg-white rounded-2xl shadow-soft-lg p-8 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            By accessing and using Creator Armour, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Creator Armour is a platform that helps Instagram creators manage brand collaborations. We provide tools for creators to share their collaboration links, receive clear offers from brands, track deal progress, and ensure timely payments.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>You must be at least 18 years old to use our service</li>
                            <li>You are responsible for safeguarding your password</li>
                            <li>You agree not to share your account with anyone else</li>
                            <li>You are responsible for all activities under your account</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Creator Responsibilities</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            As a creator using our platform, you agree to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Provide accurate information about your social media presence</li>
                            <li>Fulfill your commitments to brands in a timely manner</li>
                            <li>Create content that complies with all applicable laws and platform guidelines</li>
                            <li>Not engage in fraudulent or misleading practices</li>
                            <li>Respond to brand offers in a professional manner</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Brand Responsibilities</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Brands using our platform agree to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Provide clear and accurate offer details</li>
                            <li>Pay creators according to agreed terms</li>
                            <li>Not request content that violates platform guidelines or laws</li>
                            <li>Provide timely feedback on submitted content</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payments and Fees</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Creator Armour may charge fees for certain services. All fees will be clearly displayed before you commit to any paid service. Payment terms and conditions will be provided at the time of purchase. We reserve the right to modify our fee structure with prior notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                        <p className="text-gray-600 leading-relaxed">
                            The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Creator Armour. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including but not limited to a breach of Terms. Upon termination, your right to use the Service will immediately cease.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
                        <p className="text-gray-600 leading-relaxed">
                            In no event shall Creator Armour, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have any questions about these Terms, please contact us at:
                        </p>
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                            <p className="text-gray-600">📧 legal@creatorarmour.com</p>
                            <p className="text-gray-600">📍 Mumbai, Maharashtra, India</p>
                        </div>
                    </section>
                </div>

                <div className="mt-8 text-center">
                    <Button variant="ghost" onClick={() => window.history.back()}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </main>
        </div>
    )
}