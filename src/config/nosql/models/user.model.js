const mongoose = require('mongoose')
const { Schema } = mongoose

const UserModel = Schema(
  {
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
)

const User = mongoose.model('User', UserModel)

module.exports = User
