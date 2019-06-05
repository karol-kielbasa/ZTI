const auth = require('../../middleware/auth');
const Trip = require('../../models/Trip');
const Vehicle = require('../../models/Vehicle');
const { check, validationResult } = require('express-validator/check')
const express = require('express');
const router = express.Router();

// @route   POST api/trips
// @desc    Create trip
// @route   Private
router.post('/', auth , [
    check('userId').not().isEmpty().withMessage('User id is required'),
    check('vehicleId').not().isEmpty().withMessage('Vehicle is required'),
], async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    console.log(req.body);
    const { userId, vehicleId } = req.body;

    vehicle = await Vehicle.findById(vehicleId);
    const status = 'STARTED';
    try {
        trip = new Trip({ userId, vehicle, status });
        await trip.save();
        res.json({
            id: trip.id,
            userId: trip.userId,
            vehicle: trip.vehicle,
            status: trip.status,
        }).send();
    } catch (err) {
        console.error(err.message);
        return res.status(500).json('Server error');
    }
});

// @route   GET api/trips/{userId}
// @desc    Get all trip
// @route   Private
router.get('/:userId', auth , async (req, res) => {
    try {
        const userId = req.params.userId;
        trips = await Trip.find({userId});
        if (!trips) {
            return res.status(404).json({ errors: [{ msg: 'Trips not found' }] });
        }
        res.json({
            trips
        }).send();
    } catch (err) {
        console.log(err);
        return res.status(500).json('Server error');
    }
});

module.exports = router;