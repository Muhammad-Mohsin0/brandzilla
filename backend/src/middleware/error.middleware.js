// Error middleware — koi bhi unhandled error yahan aa jata hai
// Express mein (err, req, res, next) = 4 parameters = error middleware
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    // Development mein stack trace show karo, production mein nahi
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  })
}