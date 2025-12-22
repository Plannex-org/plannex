// src/domains/project/project.controller.js
import { ProjectService } from './project.service.js'

export const ProjectController = {
  async create(req, res) {
    try {
      const userId = req.user.id // depuis auth middleware
      const project = await ProjectService.createProject(req.body, userId)
      res.status(201).json(project)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },

  async getAll(req, res) {
    try {
      const projects = await ProjectService.getAllProjects()
      res.json(projects)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  async getById(req, res) {
    try {
      const project = await ProjectService.getProjectById(req.params.id)
      res.json(project)
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  },

  async update(req, res) {
    try {
      const project = await ProjectService.updateProject(
        req.params.id,
        req.body
      )
      res.json(project)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },

  async remove(req, res) {
    try {
      await ProjectService.deleteProject(req.params.id)
      res.json({ message: 'Project deleted successfully' })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
}
