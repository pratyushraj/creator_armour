import { Router, Request, Response } from 'express'
import { query } from '../db.js'
import { authMiddleware, AuthRequest } from './auth.js'

const router = Router()

// GET /packages - Get all packages for authenticated creator
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const creatorResult = await query('SELECT id FROM creators WHERE user_id = $1', [req.user!.id])
        if (creatorResult.rows.length === 0) {
            return res.status(404).json({ error: 'Creator profile not found' })
        }
        const creatorId = creatorResult.rows[0].id

        const packagesResult = await query(
            'SELECT * FROM packages WHERE creator_id = $1 ORDER BY price ASC',
            [creatorId]
        )

        res.json(packagesResult.rows)
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to fetch packages' })
    }
})

// POST /packages - Create a new package
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { name, description, price, deliverables } = req.body

        if (!name || !price || !deliverables) {
            return res.status(400).json({ error: 'Name, price, and deliverables are required' })
        }

        const creatorResult = await query('SELECT id FROM creators WHERE user_id = $1', [req.user!.id])
        if (creatorResult.rows.length === 0) {
            return res.status(404).json({ error: 'Creator profile not found' })
        }
        const creatorId = creatorResult.rows[0].id

        const result = await query(
            `INSERT INTO packages (creator_id, name, description, price, deliverables)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [creatorId, name, description, price, deliverables]
        )

        res.status(201).json(result.rows[0])
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to create package' })
    }
})

// DELETE /packages/:id - Delete a package
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params

        const creatorResult = await query('SELECT id FROM creators WHERE user_id = $1', [req.user!.id])
        if (creatorResult.rows.length === 0) {
            return res.status(404).json({ error: 'Creator profile not found' })
        }
        const creatorId = creatorResult.rows[0].id

        // Verify package belongs to this creator
        const packageResult = await query(
            'SELECT * FROM packages WHERE id = $1 AND creator_id = $2',
            [id, creatorId]
        )

        if (packageResult.rows.length === 0) {
            return res.status(404).json({ error: 'Package not found or not authorized' })
        }

        await query('DELETE FROM packages WHERE id = $1', [id])

        res.json({ message: 'Package deleted successfully' })
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to delete package' })
    }
})

export { router as packageRoutes }