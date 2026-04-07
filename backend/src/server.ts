import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import reviewRoutes from './routes/review.js'
import achievementRoutes from './routes/achievement.js'
import notificationRoutes from './routes/notification.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Security middleware
app.use(helmet())
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
}))

// Rate limiting (increased for stress testing)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs (increased for stress testing)
})
app.use('/api/', limiter)

// Body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// In-memory data store for demo
const users: any[] = []
const creators: any[] = []
const deals: any[] = [
    {
        id: '1',
        creator_id: '1',
        brand_name: 'Glow Skincare',
        brand_email: 'hello@glowskincare.com',
        status: 'content_creation',
        budget: 500,
        deliverables: '1 Instagram Reel + 3 Stories',
        deadline: '2024-02-15',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '2',
        creator_id: '1',
        brand_name: 'Tech Gadgets Co',
        brand_email: 'marketing@techgadgets.com',
        status: 'payment_pending',
        budget: 800,
        deliverables: '2 Instagram Posts + 1 Reel',
        deadline: '2024-01-30',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
]

// Health check
app.get('/health', (req: express.Request, res: express.Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Auth routes
app.post('/api/auth/signup', (req: express.Request, res: express.Response) => {
    const { name, email, password, instagram_handle } = req.body

    const userId = `user_${Date.now()}`
    const creatorId = `creator_${Date.now()}`
    const cleanHandle = instagram_handle.replace('@', '').toLowerCase().replace(/[^a-z0-9]/g, '-')
    const collabLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/collab/${cleanHandle}`

    const user = { id: userId, email, role: 'creator', created_at: new Date().toISOString() }
    const creator = {
        id: creatorId,
        user_id: userId,
        name,
        instagram_handle: instagram_handle.replace('@', ''),
        collab_link: collabLink,
        created_at: new Date().toISOString()
    }

    users.push(user)
    creators.push(creator)

    const token = `demo_token_${userId}`

    res.status(201).json({
        user: { ...user, token },
        creator,
    })
})

app.post('/api/auth/login', (req: express.Request, res: express.Response) => {
    const { email, password } = req.body

    // For demo, just create a user
    const userId = `user_${Date.now()}`
    const creatorId = `creator_${Date.now()}`

    const user = { id: userId, email, role: 'creator', created_at: new Date().toISOString() }
    const creator = {
        id: creatorId,
        user_id: userId,
        name: 'Demo Creator',
        instagram_handle: 'democreator',
        collab_link: 'http://localhost:5173/collab/democreator',
        created_at: new Date().toISOString()
    }

    const token = `demo_token_${userId}`

    res.json({
        user: { ...user, token },
        creator,
    })
})

app.get('/api/auth/me', (req: express.Request, res: express.Response) => {
    res.json({
        user: { id: '1', email: 'demo@example.com', role: 'creator' },
        creator: { id: '1', name: 'Demo Creator', instagram_handle: 'democreator' }
    })
})

// Creator routes
app.get('/api/creators/:handle', (req: express.Request, res: express.Response) => {
    const { handle } = req.params

    res.json({
        id: '1',
        name: 'Sarah Johnson',
        instagram_handle: handle,
        bio: 'Lifestyle & Beauty Creator | Sharing my journey through fashion, skincare, and everyday moments ✨',
        niche: 'Lifestyle & Beauty',
        audience_size: 125000,
        engagement_rate: 4.8,
        packages: [
            { id: '1', name: 'Instagram Story', description: '3 story slides with swipe-up link', price: 150, deliverables: '3 Instagram Story slides with link' },
            { id: '2', name: 'Instagram Reel', description: '15-30 second branded video', price: 500, deliverables: '1 Instagram Reel (15-30s)' },
            { id: '3', name: 'Full Campaign', description: 'Reel + 3 Stories + 1 Post', price: 1000, deliverables: '1 Reel, 3 Stories, 1 Feed Post' },
        ],
    })
})

// Deal routes
app.get('/api/deals', (req: express.Request, res: express.Response) => {
    res.json(deals)
})

app.get('/api/deals/:id', (req: express.Request, res: express.Response) => {
    const { id } = req.params
    const deal = deals.find(d => d.id === id)
    if (deal) {
        res.json(deal)
    } else {
        res.status(404).json({ error: 'Deal not found' })
    }
})

app.patch('/api/deals/:id', (req: express.Request, res: express.Response) => {
    const { id } = req.params
    const { status, content_url } = req.body

    const dealIndex = deals.findIndex(d => d.id === id)
    if (dealIndex !== -1) {
        if (status) deals[dealIndex].status = status
        if (content_url) deals[dealIndex].content_url = content_url
        deals[dealIndex].updated_at = new Date().toISOString()
        res.json(deals[dealIndex])
    } else {
        res.status(404).json({ error: 'Deal not found' })
    }
})

// Accept offer endpoint
app.post('/api/deals/accept', (req: express.Request, res: express.Response) => {
    const { offer_id } = req.body

    const dealIndex = deals.findIndex(d => d.id === offer_id)
    if (dealIndex !== -1) {
        deals[dealIndex].status = 'accepted'
        deals[dealIndex].updated_at = new Date().toISOString()
        res.json({
            success: true,
            deal: deals[dealIndex],
            message: 'Offer accepted successfully'
        })
    } else {
        res.status(404).json({ error: 'Deal not found' })
    }
})

// Submit content endpoint
app.post('/api/deals/submit-content', (req: express.Request, res: express.Response) => {
    const { deal_id, content_url } = req.body

    const dealIndex = deals.findIndex(d => d.id === deal_id)
    if (dealIndex !== -1) {
        deals[dealIndex].status = 'content_submitted'
        deals[dealIndex].content_url = content_url
        deals[dealIndex].updated_at = new Date().toISOString()
        res.json({
            success: true,
            deal: deals[dealIndex],
            message: 'Content submitted successfully'
        })
    } else {
        res.status(404).json({ error: 'Deal not found' })
    }
})

// Approve content endpoint
app.post('/api/deals/approve-content', (req: express.Request, res: express.Response) => {
    const { deal_id } = req.body

    const dealIndex = deals.findIndex(d => d.id === deal_id)
    if (dealIndex !== -1) {
        deals[dealIndex].status = 'content_approved'
        deals[dealIndex].updated_at = new Date().toISOString()
        res.json({
            success: true,
            deal: deals[dealIndex],
            message: 'Content approved successfully'
        })
    } else {
        res.status(404).json({ error: 'Deal not found' })
    }
})

// Mark payment sent endpoint
app.post('/api/deals/mark-payment-sent', (req: express.Request, res: express.Response) => {
    const { deal_id } = req.body

    const dealIndex = deals.findIndex(d => d.id === deal_id)
    if (dealIndex !== -1) {
        deals[dealIndex].status = 'payment_sent'
        deals[dealIndex].updated_at = new Date().toISOString()
        res.json({
            success: true,
            deal: deals[dealIndex],
            message: 'Payment marked as sent'
        })
    } else {
        res.status(404).json({ error: 'Deal not found' })
    }
})

// Confirm payment endpoint
app.post('/api/deals/confirm-payment', (req: express.Request, res: express.Response) => {
    const { deal_id } = req.body

    const dealIndex = deals.findIndex(d => d.id === deal_id)
    if (dealIndex !== -1) {
        deals[dealIndex].status = 'completed'
        deals[dealIndex].updated_at = new Date().toISOString()
        res.json({
            success: true,
            deal: deals[dealIndex],
            message: 'Payment confirmed - deal completed'
        })
    } else {
        res.status(404).json({ error: 'Deal not found' })
    }
})

// Offer routes
app.post('/api/offers', (req: express.Request, res: express.Response) => {
    const { creator_handle, brand_name, brand_email, deliverables, amount, deadline, notes } = req.body

    const dealId = `deal_${Date.now()}`
    const deal = {
        id: dealId,
        creator_id: '1',
        brand_name,
        brand_email,
        status: 'new_offer',
        budget: amount,
        deliverables,
        deadline,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }

    deals.push(deal)

    res.status(201).json({
        deal,
        message: 'Offer sent successfully! The creator will review it.',
    })
})

// Package routes
app.get('/api/packages', (req: express.Request, res: express.Response) => {
    res.json([
        { id: '1', name: 'Instagram Story', description: '3 story slides', price: 150, deliverables: '3 Stories' },
        { id: '2', name: 'Instagram Reel', description: '15-30s video', price: 500, deliverables: '1 Reel' },
    ])
})

// Brand routes
const brandOffers: any[] = [
    {
        id: '1',
        creator_name: 'Priya Sharma',
        creator_handle: 'priyabeauty',
        creator_avatar: 'PS',
        status: 'in_progress',
        budget: 15000,
        deliverables: '1 Instagram Reel + 3 Stories',
        deadline: '2024-02-15',
        created_at: '2024-01-20',
        platform: 'Instagram'
    },
    {
        id: '2',
        creator_name: 'Rohan Mehta',
        creator_handle: 'rohantravels',
        creator_avatar: 'RM',
        status: 'pending',
        budget: 25000,
        deliverables: '2 Posts + 1 Reel',
        deadline: '2024-02-28',
        created_at: '2024-01-25',
        platform: 'Instagram'
    },
    {
        id: '3',
        creator_name: 'Ananya Iyer',
        creator_handle: 'ananya.fashion',
        creator_avatar: 'AI',
        status: 'completed',
        budget: 30000,
        deliverables: 'Full Campaign (Reel + 5 Stories + 2 Posts)',
        deadline: '2024-01-15',
        created_at: '2024-01-01',
        platform: 'Instagram'
    },
    {
        id: '4',
        creator_name: 'Vikram Patel',
        creator_handle: 'vikram.tech',
        creator_avatar: 'VP',
        status: 'accepted',
        budget: 20000,
        deliverables: 'Product Review Reel',
        deadline: '2024-02-20',
        created_at: '2024-01-22',
        platform: 'Instagram'
    },
]

// Brand dashboard stats
app.get('/api/brand/stats', (req: express.Request, res: express.Response) => {
    const totalSpent = brandOffers.reduce((sum, o) => sum + o.budget, 0)
    const activeCampaigns = brandOffers.filter(o => ['pending', 'accepted', 'in_progress'].includes(o.status)).length
    const completedCampaigns = brandOffers.filter(o => o.status === 'completed').length

    res.json({
        totalSpent,
        activeCampaigns,
        completedCampaigns,
        avgEngagement: 4.8
    })
})

// Brand offers list
app.get('/api/brand/offers', (req: express.Request, res: express.Response) => {
    const { status } = req.query
    let offers = [...brandOffers]

    if (status && status !== 'all') {
        offers = offers.filter(o => o.status === status)
    }

    res.json(offers)
})

// Brand offer detail
app.get('/api/brand/offers/:id', (req: express.Request, res: express.Response) => {
    const { id } = req.params
    const offer = brandOffers.find(o => o.id === id)

    if (offer) {
        res.json(offer)
    } else {
        res.status(404).json({ error: 'Offer not found' })
    }
})

// Brand approve content
app.post('/api/brand/approve-content', (req: express.Request, res: express.Response) => {
    const { offer_id } = req.body

    const offerIndex = brandOffers.findIndex(o => o.id === offer_id)
    if (offerIndex !== -1) {
        brandOffers[offerIndex].status = 'completed'
        brandOffers[offerIndex].updated_at = new Date().toISOString()
        res.json({
            success: true,
            offer: brandOffers[offerIndex],
            message: 'Content approved and campaign marked as completed'
        })
    } else {
        res.status(404).json({ error: 'Offer not found' })
    }
})

// Brand reject content
app.post('/api/brand/reject-content', (req: express.Request, res: express.Response) => {
    const { offer_id, reason } = req.body

    const offerIndex = brandOffers.findIndex(o => o.id === offer_id)
    if (offerIndex !== -1) {
        brandOffers[offerIndex].status = 'in_progress'
        brandOffers[offerIndex].rejection_reason = reason
        brandOffers[offerIndex].updated_at = new Date().toISOString()
        res.json({
            success: true,
            offer: brandOffers[offerIndex],
            message: 'Content rejected and sent back for revisions'
        })
    } else {
        res.status(404).json({ error: 'Offer not found' })
    }
})

// Brand make payment
app.post('/api/brand/make-payment', (req: express.Request, res: express.Response) => {
    const { offer_id } = req.body

    const offerIndex = brandOffers.findIndex(o => o.id === offer_id)
    if (offerIndex !== -1) {
        brandOffers[offerIndex].status = 'completed'
        brandOffers[offerIndex].payment_status = 'paid'
        brandOffers[offerIndex].updated_at = new Date().toISOString()
        res.json({
            success: true,
            offer: brandOffers[offerIndex],
            message: 'Payment processed successfully'
        })
    } else {
        res.status(404).json({ error: 'Offer not found' })
    }
})

// Review routes
app.use('/api/reviews', reviewRoutes)

// Achievement routes
app.use('/api/achievements', achievementRoutes)

// Notification routes
app.use('/api/notifications', notificationRoutes)

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err)
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
    })
})

app.listen(PORT, () => {
    console.log(`🚀 Creator Armour API running on port ${PORT}`)
    console.log(`📖 Health check: http://localhost:${PORT}/health`)
    console.log(`📱 Demo mode: Using in-memory data (no database required)`)
})

export default app