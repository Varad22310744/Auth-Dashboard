const express = require('express');
const cors = require('cors');

const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');
const taskRoutes = require('../routes/task.routes');
const errorHandler = require('../middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/me', userRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.use(errorHandler);
module.exports = app;