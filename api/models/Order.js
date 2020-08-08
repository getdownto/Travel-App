const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const orderSchema = new Schema({

    mainTrip: {
        type: ObjectId,
        ref: "Travel"
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