const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://slate.textile.io/ipfs/bafkreibjzokggw22mc27xurtqwkm7fvtw37ofblbqd7kuixsq65wjw3cem"
    },
    bio: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    watchCount:{
        type: mongoose.Schema.Types.ObjectId, ///Create a reference to the user ID
        ref: "profile",
    }
})

module.exports = User = mongoose.model('user', UserSchema)