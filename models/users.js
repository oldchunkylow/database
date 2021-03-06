const mongoose = require(`mongoose`);
const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    activeSessions: [{
        type: String
    }]
}, {
    timestamp: true
})

const Users = mongoose.model(`Users`, usersSchema);
module.exports = Users;
