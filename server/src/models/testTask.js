
require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Task = require('../models/task');

async function testTask() {
    try {
        await connectDB();

        const task = new Task({
            title: 'Learn MongoDB',
            description: 'Practice Mongoose schema validation',
            status: 'pending',
            priority: 'high',
            dueDate: new Date('2026-11-01'),
            createdBy: new mongoose.Types.ObjectId()
        });

        await task.validate();

        console.log('Task validation passed!');
    } catch (error) {
        console.error('Validation failed:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

testTask();
