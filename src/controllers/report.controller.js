import reportService from '../services/report.service'

const sendScamReport = async (req, res) => {
  try {
    const data = { ...req.body }
    const evidence = req.files
    if (
      !data.scammerFaceBookLink &&
      !(data.scamBankAccountNumber && data.scammerBankName)
    ) {
      return res
        .status(400)
        .send(
          'Missing param: scammerFaceBookLink or scamBankAccountNumber required',
        )
    }
    if (!data.reportType) {
      return res.status(400).send('Missing param: reportType')
    }
    if (!evidence || evidence.length == 0) {
      return res.status(400).send('Missing param: evidence')
    }
    data.evidence = evidence
    const response = await reportService.sendScamReport(data)
    res.status(200).json(response)
  } catch {
    return res.status(500).send('Server error !')
  }
}

module.exports = {
  sendScamReport,
}
