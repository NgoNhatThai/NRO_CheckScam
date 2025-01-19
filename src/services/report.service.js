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

module.exports = {
  sendScamReport,
}
