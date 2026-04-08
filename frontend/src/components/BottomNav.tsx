import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { Home, Briefcase, BarChart3, User, Bell, LogOut } from 'lucide-react'
import { useStore } from '../store/useStore'

export function BottomNav() {
    const location = useLocation()
    const navigate = useNavigate()
    const { isAuthenticated, logout } = useStore()

    if (!isAuthenticated) return null

    const navItems = [
        { path: '/dashboard', icon: Home, label: 'Home' },
        { path: '/deals', icon: Briefcase, label: 'Deals' },
        { path: '/analytics', icon: BarChart3, label: 'Analytics' },
        { path: '/profile', icon: User, label: 'Profile' },
        { path: '/notifications', icon: Bell, label: 'Alerts' },
    ]

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb z-50">
            <div className="max-w-lg mx-auto flex items-center justify-around">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path || 
                                   (item.path === '/dashboard' && location.pathname.startsWith('/dashboard') && item.path === '/dashboard') ||
                                   (item.path === '/deals' && location.pathname.startsWith('/deal'))
                    const Icon = item.icon
                    
                    return (
                        <button
                            key={item.path}
                            onClick={() => {
                                navigate(item.path)
                            }}
                            className={cn(
                                'flex flex-col items-center justify-center py-3 px-4 min-h-[56px]',
                                'transition-colors duration-200',
                                isActive 
                                    ? 'text-primary-600' 
                                    : 'text-gray-500 hover:text-gray-700'
                            )}
                        >
                            <Icon className={cn(
                                'w-5 h-5 mb-1',
                                isActive && 'stroke-[2.5px]'
                            )} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </button>
                    )
                })}
                <button
                    onClick={handleLogout}
                    className="flex flex-col items-center justify-center py-3 px-4 min-h-[56px] text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                    <LogOut className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-medium">Logout</span>
                </button>
            </div>
        </nav>
    )
}
