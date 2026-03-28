// app.js — Express ki "main building" hai
// Yahan middlewares aur routes register hote hain

import express from 'express'
import cors from 'cors'
import { errorHandler } from './middleware/error.middleware.js'

// Routes import karenge — abhi comment hai, ek ek add hoga
// import authRoutes from './routes/auth.routes.js'

const app = express()

// ── Middlewares ─────────────────────────────────────────────
// cors: frontend (localhost:3000) ko backend (localhost:5000) se
//       baat karne ki permission deta hai
app.use(cors({
  origin: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://brandzilla.vercel.app',
  credentials: true
}))

// express.json(): request body mein JSON data read karne ke liye
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Test route ──────────────────────────────────────────────
// Yeh check karne ke liye k server chal raha hai
app.get('/', (req, res) => {
  res.json({ message: 'BrandZilla API is running!' })
})

// ── Routes (baad mein uncomment karenge) ───────────────────
// app.use('/api/auth', authRoutes)
// app.use('/api/products', productRoutes)
// app.use('/api/categories', categoryRoutes)
// app.use('/api/orders', orderRoutes)

// ── Error handler (hamesha last mein hota hai) ───────────────
app.use(errorHandler)

export default app