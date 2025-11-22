const app = require('./app');
const { connectDB } = require('./config/db');

// Load environment variables
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Start scheduler in production
if (process.env.NODE_ENV === 'production') {
  require('./utils/scheduler');
}
