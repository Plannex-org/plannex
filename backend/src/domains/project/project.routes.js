// src/domains/project/project.routes.js
import { Router } from 'express'
import { ProjectController } from './project.controller.js'

const router = Router()

router.post('/', ProjectController.create)
router.get('/', ProjectController.getAll)
router.get('/:id', ProjectController.getById)
router.put('/:id', ProjectController.update)
router.delete('/:id', ProjectController.remove)

export default router
