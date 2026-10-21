
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const Task = require('./models/Task');
const userRoutes = require('./routes/userRoutes');



const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
// Health check API

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date()
    });
});

// Start server after connecting to MongoDB
const startServer = async () => {
    try {
        await connectDB();

        // Create a test task
        const testTask = new Task({
            title: 'Test Task',
            description: 'Testing MongoDB connection',
            status: 'pending',
            priority: 'normal'
        });

        // Save task to MongoDB
        await testTask.save();
        console.log('Test task saved successfully');

        // Start the server
        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log('Application startup failed:', error.message);
        process.exit(1);
    }
};

startServer();


