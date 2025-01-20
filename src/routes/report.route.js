import reportController from '../controllers/report.controller'
// import userMiddleware from '../middleware/user.middleware'
import upload from '../config/uploadConfig/index'

const InitRouteReport = (route) => {
  route
    .route('/send-report')
    .post(upload.array('evidence', 20), reportController.sendScamReport)
  route.route('/check-scam').get(reportController.checkScam)
  route.route('/approve-scam-report').post(reportController.approveScamReport)
  return route
}
module.exports = InitRouteReport
