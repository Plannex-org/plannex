const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"],
        default: "NOT_STARTED"
    },

    optimisticTime: Number,
    probableTime: Number,
    pessimisticTime: Number,

    earliestStart: Date,
    earliestFinish: Date,
    latestStart: Date,
    latestFinish: Date,

    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    createdById: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date }
});

module.exports = mongoose.model("Task", taskSchema);