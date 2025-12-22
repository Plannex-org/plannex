// src/domains/project/project.service.js
import { ProjectModel } from './project.model.js'

export const ProjectService = {
  async createProject(payload, userId) {
    return ProjectModel.create({
      ...payload,
      createdById: userId,
    })
  },

  async getAllProjects() {
    return ProjectModel.findAll()
  },

  async getProjectById(id) {
    const project = await ProjectModel.findById(id)
    if (!project) throw new Error('Project not found')
    return project
  },

  async updateProject(id, payload) {
    return ProjectModel.update(id, payload)
  },

  async deleteProject(id) {
    return ProjectModel.softDelete(id)
  },
}
