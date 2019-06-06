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
    rate: {
        type: Number,
        required: false,
        default:0
    },
    rateSum: {
        type: Number,
        required: false,
        default:0
    },
    rateCounter: {
        type: Number,
        required: false,
        default:0
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = User = mongoose.model('vehicle', VehicleSchema);