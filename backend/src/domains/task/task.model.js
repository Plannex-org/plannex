// src/domains/task/task.model.js

import prisma from "../../../prisma/client.js";



export const TaskModel = {


    get prisma() {
        return prisma.task;
    },


    shape(data) {
        return {
            name: data.name,
            description: data.description || null,
            status: data.status || "NotStarted",

            optimisticTime: data.optimisticTime || null,
            probableTime: data.probableTime || null,
            pessimisticTime: data.pessimisticTime || null,

            earliestStart: data.earliestStart || null,
            earliestFinish: data.earliestFinish || null,
            latestStart: data.latestStart || null,
            latestFinish: data.latestFinish || null,

            projectId: data.projectId,
            createdById: data.createdById,
        };
    }
};