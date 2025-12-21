import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createDependencyService = async(predecessorId, successorId) => {
    if (predecessorId === successorId) throw new Error("A task cannot depend on itself");

    const tasks = await prisma.task.findMany({ where: { id: { in: [predecessorId, successorId] } } });
    if (tasks.length !== 2) throw new Error("One or both tasks do not exist");

    return prisma.taskDependency.create({ data: { predecessorId, successorId } });
};

export const updateDependencyService = async(id, predecessorId, successorId) => {
    const dependency = await prisma.taskDependency.findUnique({ where: { id } });
    if (!dependency) throw new Error("Dependency not found");

    if (predecessorId && successorId && predecessorId === successorId)
        throw new Error("A task cannot depend on itself");

    return prisma.taskDependency.update({ where: { id }, data: { predecessorId, successorId } });
};

export const deleteDependencyService = async(id) => {
    const dependency = await prisma.taskDependency.findUnique({ where: { id } });
    if (!dependency) throw new Error("Dependency not found");

    return prisma.taskDependency.delete({ where: { id } });
};