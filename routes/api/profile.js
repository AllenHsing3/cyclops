const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator/check')
const config = require('config')
const request = require('request')
const Profile = require('../../models/Profile');
const User = require('../../models/User')
const Post = require('../../models/Post')

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try{
        //get profile and populate with user's name and avatar
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']) 

        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user'})
        }
        res.json(profile)
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

// @route    POST api/profile
// @desc     Create or update profile
// @access   Private

router.post('/', [auth, [
    check('name', 'Status is required').not().isEmpty(),
]], async (req, res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        name,
        description,
        url
    } = req.body
    try{

        
        let profile = await Profile.findOne({ user: req.user.id });
        
        if(profile){
            profile.watchBox.push(req.body)
            await profile.save()
            return res.json(profile);
        }
        // Create profile
        profile = new Profile();
        profile.user = req.user.id
        profile.watchBox.push(req.body)
        await profile.save();
        res.json(profile)

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }

})

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public

router.get('/', async (req, res) => {
    try {
        let profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by id
// @access   Public

router.get('/user/:user_id', async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if(!profile) return res.status(400).json({ msg: 'Profile not found'})

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found'})
        }
        res.status(500).send('Server Error')
    }
});

// @route    DELETE api/profile
// @desc     Delete profile, user, and posts
// @access   Private

router.delete('/', auth, async (req, res) => {
    try {
        await Post.deleteMany({ user: req.user.id })
        await Profile.findOneAndRemove({ user: req.user.id});
        await User.findOneAndRemove({ _id: req.user.id});

        res.json({ msg: 'User removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route    PUT api/profile/experience
// @desc     Add profile expriences
// @access   Private

router.put("/experience", [auth, [
    check('title', "Title is required").not().isEmpty(),
    check('company', "Company is required").not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()}) 
    }
    // Destructure
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    // Load in variables to newExp
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route    Delete api/profile/experience/:exp_id
// @desc     Delete profile exprience
// @access   Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get the index of the experience to remove
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private

router.put("/education", [auth, [
    check('school', "School is required").not().isEmpty(),
    check('degree', "Degree is required").not().isEmpty(),
    check('fieldofstudy', "Field of study is required").not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()}) 
    }
    // Destructure
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    // Load in variables to newExp
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route    Delete api/profile/education/:edu_id
// @desc     Delete profile education
// @access   Private

router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get the index of the education to remove
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route    GET api/profile/github/:username
// @desc     Get user repos from github
// @access   Public

router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js'}
        }
        request(options, (error, response, body) => {
            if(error) console.error(error)
            if(response.statusCode !== 200){
                return res.status(404).json({ msg: 'No github profile found'})
            }
            res.json(JSON.parse(body))
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("")
    }
})

// @route    POST api/profile/photo
// @desc     Get user repos from github
// @access   Public
router.post('/photo', async (req, res) => {
    try {
      res.send(config.get('slateKey'))
    } catch (err) {
      console.error(err.message);
    }
  });



module.exports = router