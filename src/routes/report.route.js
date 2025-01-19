import reportController from '../controllers/report.controller'
// import userMiddleware from '../middleware/user.middleware'
import upload from '../config/uploadConfig/index'

const InitRouteReport = (route) => {
  route
    .route('/send-report')
    .post(upload.array('evidence', 20), reportController.sendScamReport)
  return route
}
module.exports = InitRouteReport
