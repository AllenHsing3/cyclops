const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,    ///Create a reference to the user ID
        ref: 'user'
    },
    watchBox: [{
        name: {
            type: String,
            required: true
        }, 
        description: {
            type: String
        },
        url: {
            type: String
        }
    }],
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);