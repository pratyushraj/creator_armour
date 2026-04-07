import { Router, Request, Response } from 'express'
import { query } from '../db.js'
import { authMiddleware, AuthRequest } from './auth.js'

const router = Router()

// GET /deals - Get all deals for authenticated creator
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        // Get creator ID for authenticated user
        const creatorResult = await query('SELECT id FROM creators WHERE user_id = $1', [req.user!.id])
        if (creatorResult.rows.length === 0) {
            return res.status(404).json({ error: 'Creator profile not found' })
        }
        const creatorId = creatorResult.rows[0].id

        // Fetch all deals for this creator
        const dealsResult = await query(
            `SELECT * FROM deals WHERE creator_id = $1 ORDER BY created_at DESC`,
            [creatorId]
        )

        res.json(dealsResult.rows)
    } catch (error: any) {
        console.error('Error fetching deals:', error)
        res.status(500).json({ error: error.message || 'Failed to fetch deals' })
    }
})

// GET /deals/:id - Get single deal details
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await query('SELECT * FROM deals WHERE id = $1', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Deal not found' })
        }

        res.json(result.rows[0])
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to fetch deal' })
    }
})

// PATCH /deals/:id - Update deal (status, content_url, etc.)
router.patch('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { status, content_url, brand_feedback, shipping_address } = req.body

        // Build update query dynamically
        const updates: string[] = []
        const values: any[] = []
        let paramIndex = 1

        if (status !== undefined) {
            updates.push(`status = $${paramIndex++}`)
            values.push(status)
        }
        if (content_url !== undefined) {
            updates.push(`content_url = $${paramIndex++}`)
            values.push(content_url)
        }
        if (brand_feedback !== undefined) {
            updates.push(`brand_feedback = $${paramIndex++}`)
            values.push(brand_feedback)
        }
        if (shipping_address !== undefined) {
            updates.push(`shipping_address = $${paramIndex++}`)
            values.push(shipping_address)
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No fields to update' })
        }

        updates.push(`updated_at = NOW()`)
        values.push(id)

        const result = await query(
            `UPDATE deals SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
            values
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Deal not found' })
        }

        res.json(result.rows[0])
    } catch (error: any) {
        console.error('Error updating deal:', error)
        res.status(500).json({ error: error.message || 'Failed to update deal' })
    }
})

// DELETE /deals/:id - Cancel/delete a deal
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params

        // Verify ownership
        const creatorResult = await query('SELECT id FROM creators WHERE user_id = $1', [req.user!.id])
        if (creatorResult.rows.length === 0) {
            return res.status(404).json({ error: 'Creator profile not found' })
        }
        const creatorId = creatorResult.rows[0].id

        const dealResult = await query(
            'SELECT * FROM deals WHERE id = $1 AND creator_id = $2',
            [id, creatorId]
        )

        if (dealResult.rows.length === 0) {
            return res.status(404).json({ error: 'Deal not found or not authorized' })
        }

        // Only allow cancelling deals that are not completed
        const deal = dealResult.rows[0]
        if (['completed', 'paid'].includes(deal.status)) {
            return res.status(400).json({ error: 'Cannot cancel completed deals' })
        }

        await query('UPDATE deals SET status = $1, updated_at = NOW() WHERE id = $2', ['cancelled', id])

        res.json({ message: 'Deal cancelled successfully' })
    } catch (error: any) {
        console.error('Error cancelling deal:', error)
        res.status(500).json({ error: error.message || 'Failed to cancel deal' })
    }
})

export { router as dealRoutes }