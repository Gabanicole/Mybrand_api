import mongoose from 'mongoose'

const querySchema = mongoose.Schema({
    sender: {
        name: { type: String, required: true },
        email: { type: String, required: true }
    },
    message: { type: String, required: true },
    location: { type: String, required: true },
    created_on: { type: Date, default: Date.now }
})
const Query = mongoose.model('Query', querySchema)
export default Query