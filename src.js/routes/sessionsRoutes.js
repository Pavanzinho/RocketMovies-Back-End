const { Router } = require('express')

const sessionsRoutes = Router()

const SessionsControllers = require('../controllers/SessionsControllers.js')
const sessionsControllers = new SessionsControllers

sessionsRoutes.post('/', sessionsControllers.create)


module.exports = sessionsRoutes;