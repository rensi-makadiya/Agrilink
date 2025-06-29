const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

// ✅ Import DB connection
const connectDB = require('./config/db');

// ✅ Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', require('./routes/admin')); // ✅ Correct

app.use('/orders', require('./routes/orderRoutes'));

app.use('/crop', require('./routes/cropRoutes'));
app.use('/', require('./routes/authRoutes'));

// ✅ Socket.IO setup




// Server start
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
