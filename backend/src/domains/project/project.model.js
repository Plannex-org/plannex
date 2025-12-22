// src/domains/project/project.model.js
import prisma from '../../core/config/db.js'

export const ProjectModel = {
  create(data) {
    return prisma.project.create({ data })
  },

  findAll() {
    return prisma.project.findMany({
      where: { deletedAt: null },
      include: {
        createdBy: true,
        projectMembers: true,
      },
    })
  },

  findById(id) {
    return prisma.project.findFirst({
      where: { id, deletedAt: null },
      include: {
        tasks: true,
        projectMembers: true,
      },
    })
  },

  update(id, data) {
    return prisma.project.update({
      where: { id },
      data,
    })
  },

  softDelete(id) {
    return prisma.project.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  },
}
