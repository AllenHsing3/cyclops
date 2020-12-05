const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator/check')

const User = require('../../models/User')

// @route    Post api/users
// @desc     Register User
// @access   Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),  /// Make sure it isnt empty
    check('password', 'Password must be a min of 6 characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, password } = req.body; /// Destructure for easier variable use later

    try {
        let user = await User.findOne({ name })
        if(user){
           return res.status(400).json({ errors: [{ msg: 'User already exists'}]})
        }

        user = new User({
            name,
            password,
        })
        // encrypt password
        const salt = await bcrypt.genSalt(10); // 10 is recomended in docs
        user.password = await bcrypt.hash(password, salt);
        // save user
        await user.save();
        // create jwt 
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload, 
            config.get('jwtSecret'),  /// Pull the password from config
            { expiresIn: 36000},
            (err, token) => {
                if(err) throw token;
                res.json({ token });
            }
        )
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @route    Post api/users/bio
// @desc     Register User
// @access   Private
router.post('/bio', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id)
        user.bio = req.body.bio
        await user.save()
        res.send(user)
    } catch (err) {
        console.error(err.message)
    }
})

// @route    Post api/users/avatar
// @desc     Update User Avatar
// @access   Private
router.post('/avatar', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        user.avatar = req.body.url
        await user.save()
        res.send(user)
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router