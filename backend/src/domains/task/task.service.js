const Task = require("./task.model");

class TaskService {

    async createTask(data) {
        const task = new Task(data);
        return await task.save();
    }

    async getTasksByProject(projectId) {
        return await Task.find({ projectId, deletedAt: null });
    }

    async getTaskById(id) {
        return await Task.findOne({ _id: id, deletedAt: null });
    }

    async updateTask(id, data) {
        data.updatedAt = Date.now();
        return await Task.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteTask(id) {
        return await Task.findByIdAndUpdate(id, { deletedAt: Date.now() }, { new: true });
    }
}

module.exports = new TaskService();