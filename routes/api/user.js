const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register user
// @route   Public
router.post('/register', [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Email is not valid'),
    check('password').isLength({ min: 6 }).withMessage('Password must be with 6 or more characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        user = new User({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.json({
            id: user.id,
            name: user.name,
            email: user.email
        }).send();
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

// @route   POST api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post('/login', [
    check('email').isEmail().withMessage('Email is not valid'),
    check('password').isLength({ min: 6 }).withMessage('Password must be with 6 or more characters')
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ errors: [{ msg: 'User not found' }] });
        }
        let isCorrect = await bcrypt.compare(password, user.password);
        if (isCorrect) {
            const payload = {
                user: { id: user.id, name: user.name }
            }
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
                if (err) {
                    console.error(err);
                    throw err;
                }
                res.json({ token }).send();
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
})

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', auth, (req, res) => {
    res.json({ user: req.user });
});
module.exports = router;