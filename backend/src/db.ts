import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

export async function query(text: string, params?: any[]) {
    const client = await pool.connect()
    try {
        const result = await client.query(text, params)
        return result
    } finally {
        client.release()
    }
}

export async function initDatabase() {
    // Create tables if they don't exist
    await query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'creator',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

    await query(`
    CREATE TABLE IF NOT EXISTS creators (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      instagram_handle TEXT UNIQUE NOT NULL,
      bio TEXT,
      city TEXT,
      niche TEXT,
      reel_price INTEGER,
      collab_link TEXT,
      audience_size INTEGER,
      engagement_rate DECIMAL(3,2),
      profile_image TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

    await query(`
    CREATE TABLE IF NOT EXISTS deals (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      creator_id UUID REFERENCES creators(id) ON DELETE CASCADE,
      brand_name TEXT NOT NULL,
      brand_email TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new_offer',
      budget INTEGER NOT NULL,
      deadline DATE,
      deliverables TEXT NOT NULL,
      content_url TEXT,
      brand_feedback TEXT,
      shipping_address TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

    await query(`
    CREATE TABLE IF NOT EXISTS offers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
      brand_name TEXT NOT NULL,
      brand_email TEXT NOT NULL,
      deliverables TEXT NOT NULL,
      amount INTEGER NOT NULL,
      deadline DATE,
      notes TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

    await query(`
    CREATE TABLE IF NOT EXISTS packages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      creator_id UUID REFERENCES creators(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT,
      price INTEGER NOT NULL,
      deliverables TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

    await query(`
    CREATE TABLE IF NOT EXISTS notifications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT NOT NULL,
      read BOOLEAN DEFAULT FALSE,
      deal_id UUID REFERENCES deals(id),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `)

    // Create indexes
    await query(`
    CREATE INDEX IF NOT EXISTS idx_creators_instagram ON creators(instagram_handle)
  `)
    await query(`
    CREATE INDEX IF NOT EXISTS idx_creators_user_id ON creators(user_id)
  `)
    await query(`
    CREATE INDEX IF NOT EXISTS idx_deals_creator_id ON deals(creator_id)
  `)
    await query(`
    CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status)
  `)

    console.log('✅ Database initialized')
}

export default pool