const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check')


// @route   POST api/user
// @desc    Register user
// @route   Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password must be with 6 or more characters').isLength({ min: 6 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }
    res.send('User route')
});

module.exports = router;