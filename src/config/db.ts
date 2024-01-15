import mongoose from 'mongoose'
const connection = mongoose.connect('mongodb://localhost:27017')
module.exports = connection