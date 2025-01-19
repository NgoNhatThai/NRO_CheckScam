import express from 'express'
import InitRouteReport from '../routes/report.route'

const router = express.Router()

const configRoutes = async (app) => {
  app.get('/health', (req, res) => {
    return res.status(200).send({
      status: 'OK',
      message: 'Server is up and running',
    })
  })
  app.use('/report', InitRouteReport(router))
}

module.exports = configRoutes
