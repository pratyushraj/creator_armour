import { Router, Request, Response } from 'express'
import { query } from '../db.js'

const router = Router()

// GET /creators/:handle - Get creator public profile
router.get('/:handle', async (req: Request, res: Response) => {
    try {
        const { handle } = req.params

        const result = await query(
            `SELECT id, name, instagram_handle, bio, niche, audience_size, engagement_rate 
       FROM creators WHERE instagram_handle = $1`,
            [handle.toLowerCase()]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Creator not found' })
        }

        const creator = result.rows[0]

        // Get creator's packages
        const packagesResult = await query(
            `SELECT id, name, description, price, deliverables 
       FROM packages WHERE creator_id = $1 ORDER BY price ASC`,
            [creator.id]
        )

        res.json({
            ...creator,
            packages: packagesResult.rows,
        })
    } catch (error: any) {
        console.error('Error fetching creator:', error)
        res.status(500).json({ error: error.message || 'Failed to fetch creator' })
    }
})

// GET /creators/:handle/packages - Get creator's packages
router.get('/:handle/packages', async (req: Request, res: Response) => {
    try {
        const { handle } = req.params

        const creatorResult = await query(
            'SELECT id FROM creators WHERE instagram_handle = $1',
            [handle.toLowerCase()]
        )

        if (creatorResult.rows.length === 0) {
            return res.status(404).json({ error: 'Creator not found' })
        }

        const packagesResult = await query(
            `SELECT id, name, description, price, deliverables, created_at 
       FROM packages WHERE creator_id = $1 ORDER BY price ASC`,
            [creatorResult.rows[0].id]
        )

        res.json(packagesResult.rows)
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to fetch packages' })
    }
})

export { router as creatorRoutes }