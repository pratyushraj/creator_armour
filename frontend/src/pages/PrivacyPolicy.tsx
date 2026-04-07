import { Link } from 'react-router-dom'
import { Shield, ArrowLeft, Lock, Eye, Database, Mail } from 'lucide-react'
import { Button } from '../components/Button'

export function PrivacyPolicy() {
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                    <p className="text-gray-500">Last updated: July 4, 2026</p>
                </div>

                <div className="bg-white rounded-2xl shadow-soft-lg p-8 space-y-8">
                    {/* Introduction */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                <Shield className="w-5 h-5 text-primary-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Creator Armour ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform for managing brand collaborations on Instagram.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Database className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            When you create an account, we collect:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
                            <li>Name and email address</li>
                            <li>Instagram username and profile information</li>
                            <li>Password (encrypted and secure)</li>
                            <li>Payment information (processed securely via Stripe)</li>
                        </ul>

                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            When you use our service, we automatically collect:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Device information (type, operating system, browser)</li>
                            <li>IP address and location data</li>
                            <li>Usage data and analytics</li>
                            <li>Cookies and similar technologies</li>
                        </ul>
                    </section>

                    {/* How We Use Your Information */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <Eye className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process transactions and send related information</li>
                            <li>Connect creators with brands for collaborations</li>
                            <li>Send technical notices and support messages</li>
                            <li>Respond to your comments, questions, and requests</li>
                            <li>Monitor and analyze trends, usage, and activities</li>
                            <li>Detect, investigate, and prevent fraudulent transactions</li>
                            <li>Personalize your experience on our platform</li>
                        </ul>
                    </section>

                    {/* Information Sharing */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <Mail className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Information Sharing</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We may share your information with:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li><strong>Brands:</strong> When you create a collaboration link, brands can view your profile and send offers</li>
                            <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (hosting, payment processing, analytics)</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                            <li><strong>Business Transfers:</strong> In connection with any merger, sale, or transfer of assets</li>
                        </ul>
                    </section>

                    {/* Data Security */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <Lock className="w-5 h-5 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                <Shield className="w-5 h-5 text-yellow-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Your Rights and Choices</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Access your personal information</li>
                            <li>Correct inaccurate or incomplete data</li>
                            <li>Delete your account and personal data</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Export your data in a portable format</li>
                            <li>Withdraw consent where processing is based on consent</li>
                        </ul>
                    </section>

                    {/* Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some features of our service.
                        </p>
                    </section>

                    {/* Data Retention */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We retain your personal information for as long as your account is active or as needed to provide you services. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
                        </p>
                    </section>

                    {/* Children's Privacy */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal data, please contact us and we will take steps to delete such information.
                        </p>
                    </section>

                    {/* Changes to Policy */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-2">
                            <p className="text-gray-600">📧 privacy@creatorarmour.com</p>
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