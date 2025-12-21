import {
    createDependencyService,
    updateDependencyService,
    deleteDependencyService
} from "./taskDependency.service.js";

export const taskDependencyController = {

    // CREATE DEPENDENCY
    async create(req, res) {
        try {
            const { predecessorId, successorId } = req.body;
            const dependency = await createDependencyService(predecessorId, successorId);
            res.status(201).json({ message: "Task dependency created successfully", dependency });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // UPDATE DEPENDENCY
    async update(req, res) {
        try {
            const { id } = req.params;
            const { predecessorId, successorId } = req.body;
            const updated = await updateDependencyService(id, predecessorId, successorId);
            res.json({ message: "Task dependency updated successfully", updated });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // DELETE DEPENDENCY
    async remove(req, res) {
        try {
            const { id } = req.params;
            await deleteDependencyService(id);
            res.json({ message: "Task dependency deleted successfully" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};