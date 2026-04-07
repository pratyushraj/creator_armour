import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query } from '../db.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

interface AuthRequest extends Request {
    user?: {
        id: string
        email: string
        role: string
    }
}

// Middleware to verify JWT token
export const authMiddleware = async (req: AuthRequest, res: Response, next: Function) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')
        if (!token) {
            return res.status(401).json({ error: 'No token provided' })
        }

        const decoded = jwt.verify(token, JWT_SECRET) as any
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' })
    }
}

// POST /auth/signup
router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { name, email, password, instagram_handle } = req.body

        // Validate input
        if (!name || !email || !password || !instagram_handle) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        // Check if user exists
        const existingUser = await query('SELECT id FROM users WHERE email = $1', [email])
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Email already registered' })
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10)

        // Create user
        const userResult = await query(
            'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at',
            [email, passwordHash, 'creator']
        )
        const user = userResult.rows[0]

        // Generate collab link
        const cleanHandle = instagram_handle.replace('@', '').toLowerCase().replace(/[^a-z0-9]/g, '-')
        const collabLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/collab/${cleanHandle}`

        // Create creator profile
        const creatorResult = await query(
            `INSERT INTO creators (user_id, name, instagram_handle, collab_link) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
            [user.id, name, instagram_handle.replace('@', ''), collabLink]
        )
        const creator = creatorResult.rows[0]

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.status(201).json({
            user: { ...user, token },
            creator,
        })
    } catch (error: any) {
        console.error('Signup error:', error)
        res.status(500).json({ error: error.message || 'Failed to create account' })
    }
})

// POST /auth/login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' })
        }

        // Find user
        const userResult = await query('SELECT * FROM users WHERE email = $1', [email])
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        const user = userResult.rows[0]

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password_hash)
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        // Get creator profile
        const creatorResult = await query('SELECT * FROM creators WHERE user_id = $1', [user.id])
        const creator = creatorResult.rows[0]

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.json({
            user: { ...user, token },
            creator,
        })
    } catch (error: any) {
        console.error('Login error:', error)
        res.status(500).json({ error: error.message || 'Failed to log in' })
    }
})

// GET /auth/me
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const userResult = await query('SELECT id, email, role, created_at FROM users WHERE id = $1', [req.user!.id])
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user = userResult.rows[0]
        const creatorResult = await query('SELECT * FROM creators WHERE user_id = $1', [req.user!.id])
        const creator = creatorResult.rows[0]

        res.json({ user, creator })
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to get user' })
    }
})

export { router as authRoutes, AuthRequest }