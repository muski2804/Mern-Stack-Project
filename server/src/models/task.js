const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Task title is required'],
            trim: true
        },

        description: {
            type: String,
            required: [true, 'Task description is required'],
            trim: true
        },

        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending',
            required: true
        },

        priority: {
            type: String,
            enum: ['low', 'normal', 'high'],
            default: 'normal',
            required: true
        },

        dueDate: {
            type: Date,
            default: null
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Task', taskSchema);