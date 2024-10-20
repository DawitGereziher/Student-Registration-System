const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database'); 
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const progressRoutes = require('./routes/progressRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const reportRoutes = require('./routes/reportRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const loginRoutes = require('./routes/loginRoutes');
const {authMiddleware} = require('./middlewares/authentication');

const app = express();


connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/login', loginRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', authMiddleware(['student', 'admin']), userRoutes);
app.use('/api/registrations', authMiddleware(['admin']), registrationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/schedules', scheduleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});