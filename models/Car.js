const mongoose = require('mongoose');

const CarPostSchema = mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    fuel: {
        type: String,
        required: true
    },
    engineSize: {
        type: String,
        required: true
    },
    transmition: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    milage: {
        type: Number,
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    doors: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    bhp: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    carImg: [{
        type: String
    }],
    sold: {
        type: String,
        default: 'false'
    },
    features: [{
        type: String
    }]
})

CarPostSchema.set('timestamps', true)

module.exports = mongoose.model('Cars' , CarPostSchema)