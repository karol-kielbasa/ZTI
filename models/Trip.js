const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    vehicle: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = Trip = mongoose.model('trip', TripSchema);