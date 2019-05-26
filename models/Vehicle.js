const mongoose = require('mongoose');
const VehicleSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = User = mongoose.model('vehicle', VehicleSchema);