require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const connectDB = require('../config/db');
const User = require('../models/User');
const Task = require('../models/Task');

const seedDatabase = async () => {
    try {
        // Connect using the same database configuration
        await connectDB();

        // Delete existing development data
        await Task.deleteMany({});
        await User.deleteMany({});

        console.log('Existing Users and Tasks cleared');

        // Hash sample passwords before saving users
        const hashedPassword = await bcrypt.hash(
            'Demo@123',
            10
        );

        // Create 4 sample users
        const users = await User.insertMany([
            {
                name: 'Ali Ahmed',
                email: 'ali@example.com',
                passwordHash: hashedPassword,
                role: 'admin'
            },
            {
                name: 'Sara Khan',
                email: 'sara@example.com',
                passwordHash: hashedPassword,
                role: 'user'
            },
            {
                name: 'Usman Malik',
                email: 'usman@example.com',
                passwordHash: hashedPassword,
                role: 'user'
            },
            {
                name: 'Ayesha Noor',
                email: 'ayesha@example.com',
                passwordHash: hashedPassword,
                role: 'user'
            }
        ]);

        console.log(`${users.length} sample users created`);

        // Create 10 sample tasks linked to the users
        const tasks = [
            {
                title: 'Complete project proposal',
                description: 'Prepare the initial project proposal',
                status: 'pending',
                priority: 'high',
                dueDate: new Date('2026-11-01'),
                createdBy: users[0]._id
            },
            {
                title: 'Design database',
                description: 'Design the application database structure',
                status: 'in-progress',
                priority: 'high',
                dueDate: new Date('2026-11-03'),
                createdBy: users[0]._id
            },
            {
                title: 'Create login page',
                description: 'Build the login interface',
                status: 'completed',
                priority: 'normal',
                dueDate: new Date('2026-10-25'),
                createdBy: users[1]._id
            },
            {
                title: 'Write API documentation',
                description: 'Document the available API endpoints',
                status: 'pending',
                priority: 'normal',
                dueDate: new Date('2026-11-05'),
                createdBy: users[1]._id
            },
            {
                title: 'Test health endpoint',
                description: 'Verify the health API returns a valid response',
                status: 'completed',
                priority: 'low',
                dueDate: new Date('2026-10-22'),
                createdBy: users[2]._id
            },
            {
                title: 'Fix validation errors',
                description: 'Review and correct schema validation issues',
                status: 'in-progress',
                priority: 'high',
                dueDate: new Date('2026-10-28'),
                createdBy: users[2]._id
            },
            {
                title: 'Prepare presentation',
                description: 'Prepare slides for the project demonstration',
                status: 'pending',
                priority: 'normal',
                dueDate: new Date('2026-11-07'),
                createdBy: users[3]._id
            },
            {
                title: 'Review user requirements',
                description: 'Check all user requirements for completeness',
                status: 'completed',
                priority: 'low',
                dueDate: new Date('2026-10-23'),
                createdBy: users[3]._id
            },
            {
                title: 'Test database connection',
                description: 'Confirm MongoDB reads and writes work',
                status: 'completed',
                priority: 'high',
                dueDate: new Date('2026-10-21'),
                createdBy: users[0]._id
            },
            {
                title: 'Finalize project report',
                description: 'Complete the final project report',
                status: 'pending',
                priority: 'normal',
                dueDate: new Date('2026-11-10'),
                createdBy: users[1]._id
            }
        ];

        const createdTasks = await Task.insertMany(tasks);

        console.log(`${createdTasks.length} sample tasks created`);
        console.log('Database seeding completed successfully');
    } catch (error) {
        console.error('Database seeding failed:', error.message);
        process.exitCode = 1;
    } finally {
        // Close the connection when the script finishes
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
};

seedDatabase();