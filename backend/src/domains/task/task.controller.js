const taskService = require("./task.service");

class TaskController {

    async createTask(req, res) {
        try {
            const task = await taskService.createTask(req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getTasksByProject(req, res) {
        try {
            const tasks = await taskService.getTasksByProject(req.params.projectId);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getTaskById(req, res) {
        try {
            const task = await taskService.getTaskById(req.params.id);
            if (!task) return res.status(404).json({ message: "Task not found" });
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateTask(req, res) {
        try {
            const task = await taskService.updateTask(req.params.id, req.body);
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteTask(req, res) {
        try {
            const task = await taskService.deleteTask(req.params.id);
            res.status(200).json({ message: "Task deleted", task });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new TaskController();