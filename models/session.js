const mongoose = require(`mongoose`);
const sessionSchema = new mongoose.Schema({
    sessionName: {
        type: String,
        required: true
    }
}, {
    timestamp: true
})

const Session = mongoose.model(`Session`, sessionSchema);
module.exports = Session;
