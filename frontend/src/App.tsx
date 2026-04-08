import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
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
import { useStore } from './store/useStore'

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useStore()
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    
    return <>{children}</>
}

function AppContent() {
    const location = useLocation()
    const showBottomNav = ['/dashboard', '/deal', '/profile', '/settings', '/analytics'].some(path => location.pathname.startsWith(path))
    
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/collab/:handle" element={<CollabPage />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/deal/:id" element={
                    <ProtectedRoute>
                        <DealDetail />
                    </ProtectedRoute>
                } />
                <Route path="/brand/dashboard" element={
                    <ProtectedRoute>
                        <BrandDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/settings" element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                } />
                <Route path="/analytics" element={
                    <ProtectedRoute>
                        <Analytics />
                    </ProtectedRoute>
                } />
                
                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
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
