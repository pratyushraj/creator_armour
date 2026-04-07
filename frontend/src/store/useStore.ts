import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Creator, Deal, Offer, Notification } from '../types'

interface AppState {
    // Auth
    user: User | null
    creator: Creator | null
    isAuthenticated: boolean

    // Deals
    deals: Deal[]
    activeDeal: Deal | null

    // Offers
    pendingOffers: Offer[]

    // Notifications
    notifications: Notification[]
    unreadCount: number

    // UI State
    isLoading: boolean
    error: string | null

    // Actions
    setUser: (user: User | null) => void
    setCreator: (creator: Creator | null) => void
    setDeals: (deals: Deal[]) => void
    addDeal: (deal: Deal) => void
    updateDeal: (deal: Deal) => void
    setActiveDeal: (deal: Deal | null) => void
    setPendingOffers: (offers: Offer[]) => void
    addPendingOffer: (offer: Offer) => void
    setNotifications: (notifications: Notification[]) => void
    addNotification: (notification: Notification) => void
    markNotificationRead: (id: string) => void
    setIsLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    logout: () => void
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            // Initial state
            user: null,
            creator: null,
            isAuthenticated: false,
            deals: [],
            activeDeal: null,
            pendingOffers: [],
            notifications: [],
            unreadCount: 0,
            isLoading: false,
            error: null,

            // Actions
            setUser: (user) => set({ user, isAuthenticated: !!user }),
            setCreator: (creator) => set({ creator }),
            setDeals: (deals) => set({ deals }),
            addDeal: (deal) => set((state) => ({ deals: [...state.deals, deal] })),
            updateDeal: (updatedDeal) => set((state) => ({
                deals: state.deals.map((d) => d.id === updatedDeal.id ? updatedDeal : d),
                activeDeal: state.activeDeal?.id === updatedDeal.id ? updatedDeal : state.activeDeal,
            })),
            setActiveDeal: (deal) => set({ activeDeal: deal }),
            setPendingOffers: (offers) => set({ pendingOffers: offers }),
            addPendingOffer: (offer) => set((state) => ({ pendingOffers: [...state.pendingOffers, offer] })),
            setNotifications: (notifications) => set({
                notifications,
                unreadCount: notifications.filter((n) => !n.read).length
            }),
            addNotification: (notification) => set((state) => ({
                notifications: [notification, ...state.notifications],
                unreadCount: state.unreadCount + 1,
            })),
            markNotificationRead: (id) => set((state) => ({
                notifications: state.notifications.map((n) =>
                    n.id === id ? { ...n, read: true } : n
                ),
                unreadCount: Math.max(0, state.unreadCount - 1),
            })),
            setIsLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),
            logout: () => set({
                user: null,
                creator: null,
                isAuthenticated: false,
                deals: [],
                activeDeal: null,
                pendingOffers: [],
                notifications: [],
                unreadCount: 0,
            }),
        }),
        {
            name: 'creator-armour-storage',
            partialize: (state) => ({
                user: state.user,
                creator: state.creator,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)