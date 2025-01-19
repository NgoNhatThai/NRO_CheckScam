const mongoose = require('mongoose')
const { Schema } = mongoose

const ReportModel = Schema(
  {
    scamBankAccountNumber: String,
    scammerName: { type: [String], default: [] },
    scammerFaceBookLink: String,
    scammerBankName: String,
    evidence: { type: [String], require: true },
    description: String,
    reporterName: String,
    reporterPhoneNumber: String,
    reporterEmail: String,
    reportType: {
      type: String,
      enum: ['VICTIM', 'PROXY'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Report = mongoose.model('Report', ReportModel)

module.exports = Report
