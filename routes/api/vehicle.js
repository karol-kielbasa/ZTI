const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check')
const config = require('config');
const auth = require('../../middleware/auth');
const Vehicle = require('../../models/Vehicle');

// @route   POST api/vehicles
// @desc    Create vehicle
// @route   Private
router.post('/', auth , [
    check('type').not().isEmpty().withMessage('Type is required'),
    check('lat').not().isEmpty().withMessage('Latitude is required'),
    check('long').not().isEmpty().withMessage('Longitude is required'),
    check('name').not().isEmpty().withMessage('Name is required'),
    check('imgUrl').not().isEmpty().withMessage('Image url isrequired'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const { type, lat, long, name, imgUrl } = req.body;
    try {
        vehicle = new Vehicle({ type, lat, long, name, imgUrl});
        await vehicle.save();
        res.json({
            id: vehicle.id,
            name: vehicle.name,
            type: vehicle.type,
            lat: vehicle.lat,
            long: vehicle.long,
            imgUrl: vehicle.imgUrl,
        }).send();
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

// @route   GET api/vehicles/{id}
// @desc    Get vehicle by id
// @route   Private
router.get('/:id', auth , async (req, res) => {
    try {
        vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ errors: [{ msg: 'Vehicle not found' }] });
        }
        res.json({
            id: vehicle.id,
            name: vehicle.name,
            type: vehicle.type,
            lat: vehicle.lat,
            long: vehicle.long,
            imgUrl: vehicle.imgUrl,
        }).send();
    } catch (err) {
        console.error(err.message);
        return res.status(500).json('Server error');
    }
});

// @route   GET api/vehicles/
// @desc    Get all vehicle
// @route   Private
router.get('/', auth , async (req, res) => {
    try {
        vehicles = await Vehicle.find();
        if (!vehicles) {
            return res.status(404).json({ errors: [{ msg: 'Vehicles not found' }] });
        }
        res.json({
            vehicles
        }).send();
    } catch (err) {
        console.log(vehicles);
        console.error(err.message);
        return res.status(500).json('Server error');
    }
});

module.exports = router;