// server.js — yeh file sirf ek kaam karta hai:
// database connect karo, phir server start karo

import 'dotenv/config'          // .env file load karo SABSE PEHLE
import app from './src/app.js'
import connectDB from './src/config/db.js'

const PORT = process.env.PORT || 5000

// Pehle DB connect, phir server start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`BrandZilla server running on port ${PORT}`)
  })
})