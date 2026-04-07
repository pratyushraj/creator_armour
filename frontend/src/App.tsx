import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ErrorBoundary, BottomNav, ToastProvider } from './components'
import {
    Landing,
    Signup,
    Login,
    Dashboard,
    DealDetail,
    CollabPage,
    TermsOfService,
    PrivacyPolicy,
    BrandDashboard,
    Settings,
    Analytics
} from './pages'

function AppContent() {
    const location = useLocation()
    const showBottomNav = ['/dashboard', '/deal', '/profile', '/settings', '/analytics'].some(path => location.pathname.startsWith(path))
    
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/deal/:id" element={<DealDetail />} />
                <Route path="/collab/:handle" element={<CollabPage />} />
                <Route path="/brand/dashboard" element={<BrandDashboard />} />
                <Route path="/profile" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
            {showBottomNav && <BottomNav />}
        </>
    )
}

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <ToastProvider>
                    <AppContent />
                </ToastProvider>
            </BrowserRouter>
        </ErrorBoundary>
    )
}

export default App
