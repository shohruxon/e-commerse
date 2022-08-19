const { Schema, model } = require('mongoose')
const adminSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        default:'intern'
    }



})
module.exports = model('admin', adminSchema)