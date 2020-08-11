const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Date, ObjectId } = Schema.Types;

const orderSchema = new Schema({

    mainTrip: {
        type: ObjectId,
        ref: "Travel"
    },

    destination: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    mainTripPrice: {
        type: Number,
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    additionalTrips: [],

    user: {
        type: ObjectId,
        ref: "User"
    }

});

module.exports = new Model('Order', orderSchema);