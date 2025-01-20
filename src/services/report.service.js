import cloudinary from '../config/cloudinary'
const Report = require('../config/nosql/models/report.model')
import fs from 'fs'
import path from 'path'

const sendScamReport = async (data) => {
  try {
    // Upload images and remove local files
    const uploadedImages = await Promise.all(
      data.evidence.map(async (image) => {
        // Upload image to Cloudinary and wait for the result
        const result = await cloudinary.uploader.upload(image.path, {
          folder: 'scam_reports',
        })

        // Remove the local image after uploading
        fs.unlinkSync(image.path) // Sử dụng image.path thay vì imagePath

        return result // Return the result of Cloudinary upload
      }),
    )

    // Map the results to get the secure URLs
    const imageUrls = uploadedImages.map((result) => result.secure_url)

    // Create the scam report
    const scamInfo = new Report({
      ...data,
      evidence: imageUrls,
    })

    // Save to database
    const result = await Report.create(scamInfo)

    return {
      status: 200,
      message: 'Create scam report successfully!',
      data: result,
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    }
  }
}
const checkScam = async (data) => {
  try {
    if (data.scammerFaceBookLink) {
      const reports = await Report.find({
        scammerFaceBookLink: data.scammerFaceBookLink,
        status: 'APPROVED',
      })
      return {
        status: 200,
        message: 'Get scam reports successfully!',
        data: reports,
      }
    } else {
      if (data.scammerBankName && data.scamBankAccountNumber) {
        const reports = await Report.find({
          scammerBankName: data.scammerBankName,
          scamBankAccountNumber: data.scamBankAccountNumber,
          status: 'APPROVED',
        })
        return {
          status: 200,
          message: 'Get scam reports successfully!',
          data: reports,
        }
      }
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    }
  }
}
const approveScamReport = async (id) => {
  try {
    const scamReport = await Report.findOne({
      _id: id,
    })
    if (!scamReport) {
      return {
        status: 404,
        message: 'Not found scam report: check id!',
      }
    }
    return {
      status: 200,
      message: 'Approved scam reports successfully!',
      data: scamReport,
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    }
  }
}
module.exports = {
  sendScamReport,
  checkScam,
  approveScamReport,
}
