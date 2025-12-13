// src/domains/task/task.controller.js
import { taskService } from "./task.service.js";

export const taskController = {

    // CREATE
    async create(req, res) {
        try {
            const task = await taskService.createTask(req.body);
            res.status(201).json(task);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la création de la tâche" });
        }
    },

    // GET ALL
    async getAll(req, res) {
        try {
            const tasks = await taskService.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des tâches" });
        }
    },

    // GET ONE
    async getOne(req, res) {
        try {
            const task = await taskService.getTaskById(req.params.id);
            if (!task) return res.status(404).json({ message: "Tâche introuvable" });
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: "Erreur" });
        }
    },

    // UPDATE
    async update(req, res) {
        try {
            const task = await taskService.updateTask(req.params.id, req.body);
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la modification" });
        }
    },

    // DELETE
    async remove(req, res) {
        try {
            const task = await taskService.deleteTask(req.params.id);
            res.status(200).json({ message: "Tâche supprimée", task });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression" });
        }
    }
};