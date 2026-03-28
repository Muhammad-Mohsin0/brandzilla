// db.js — Mongoose se MongoDB Atlas connect karna
// mongoose.connect() ek baar call karo app start par
// phir poori app mein database available rahega

import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`)
    process.exit(1) // error aya to server band kar do
  }
}

export default connectDB