// src/domains/task/task.service.js
import prisma from "../../../prisma/client.js";

export const taskService = {

    // CREATE TASK
    async createTask(data) {
        return prisma.task.create({
            data: {
                name: data.name,
                description: data.description,
                status: data.status,
                optimisticTime: data.optimisticTime,
                probableTime: data.probableTime,
                pessimisticTime: data.pessimisticTime,
                projectId: data.projectId,
                createdById: data.createdById
            }
        });
    },

    // GET ALL TASKS
    async getAllTasks() {
        return prisma.task.findMany({
            include: {
                subtasks: true,
                predecessors: true,
                successors: true,
                margins: true
            }
        });
    },

    // GET ONE TASK
    async getTaskById(id) {
        return prisma.task.findUnique({
            where: { id },
            include: {
                subtasks: true,
                predecessors: true,
                successors: true,
                margins: true
            }
        });
    },

    // UPDATE TASK
    async updateTask(id, data) {
        return prisma.task.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                status: data.status,
                optimisticTime: data.optimisticTime,
                probableTime: data.probableTime,
                pessimisticTime: data.pessimisticTime
            }
        });
    },

    // DELETE TASK (soft delete OR hard delete)
    async deleteTask(id) {
        return prisma.task.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
};