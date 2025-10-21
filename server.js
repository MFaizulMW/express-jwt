require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const refreshRoutes = require('./routes/refresh');
const authMiddleware = require('./middleware/authMiddleware');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/refresh', refreshRoutes);
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello User ${req.user.id}, you have accessed a protected route!` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
