import { Router, Request, Response } from 'express'
import { query } from '../db.js'

const router = Router()

// POST /offers - Create a new offer (from brand)
router.post('/', async (req: Request, res: Response) => {
    try {
        const {
            creator_handle,
            brand_name,
            brand_email,
            deliverables,
            amount,
            deadline,
            notes,
        } = req.body

        // Validate required fields
        if (!creator_handle || !brand_name || !brand_email || !deliverables || !amount) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        // Find creator by handle
        const creatorResult = await query(
            'SELECT id FROM creators WHERE instagram_handle = $1',
            [creator_handle.toLowerCase()]
        )

        if (creatorResult.rows.length === 0) {
            return res.status(404).json({ error: 'Creator not found' })
        }

        const creatorId = creatorResult.rows[0].id

        // Create deal from offer
        const dealResult = await query(
            `INSERT INTO deals (creator_id, brand_name, brand_email, status, budget, deliverables, deadline)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [creatorId, brand_name, brand_email, 'new_offer', amount, deliverables, deadline]
        )

        const deal = dealResult.rows[0]

        // Create offer record
        const offerResult = await query(
            `INSERT INTO offers (deal_id, brand_name, brand_email, deliverables, amount, deadline, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [deal.id, brand_name, brand_email, deliverables, amount, deadline, notes]
        )

        const offer = offerResult.rows[0]

        // TODO: Send notification to creator about new offer

        res.status(201).json({
            deal,
            offer,
            message: 'Offer sent successfully! The creator will review it.',
        })
    } catch (error: any) {
        console.error('Error creating offer:', error)
        res.status(500).json({ error: error.message || 'Failed to create offer' })
    }
})

// POST /offers/:id/accept - Accept an offer
router.post('/:id/accept', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        // Update offer status
        await query('UPDATE offers SET status = $1 WHERE id = $2', ['accepted', id])

        // Update deal status
        await query('UPDATE deals SET status = $1 WHERE id = (SELECT deal_id FROM offers WHERE id = $2)', [
            'accepted',
            id,
        ])

        res.json({ message: 'Offer accepted!' })
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to accept offer' })
    }
})

// POST /offers/:id/decline - Decline an offer
router.post('/:id/decline', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        // Update offer status
        await query('UPDATE offers SET status = $1 WHERE id = $2', ['declined', id])

        // Update deal status
        await query('UPDATE deals SET status = $1 WHERE id = (SELECT deal_id FROM offers WHERE id = $2)', [
            'declined',
            id,
        ])

        res.json({ message: 'Offer declined.' })
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to decline offer' })
    }
})

export { router as offerRoutes }