const models = require('../models');
const mongoose = require('mongoose');

module.exports = {
    get: {
        all: (req, res, next) => {
            models.Order.find().populate('user')
                .then((orders) => res.send(orders))
                .catch(next);
        },
        single: (req, res, next) => {
            const id = req.params.id;

            models.Order.findOne({ _id: id }).populate('user')
                .then((order) => res.send(order))
                .catch(next);
        }
    },

    post: (req, res, next) => {
        const { mainTrip, destination, imageUrl, startDate, duration, mainTripPrice, totalPrice, status, additionalTrips } = req.body;
        const { _id } = req.user;
        console.log(_id)

        models.Order.create({ mainTrip, destination, imageUrl, startDate, duration, mainTripPrice, totalPrice, status: 'NEW', additionalTrips, user: _id })
            .then((created) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { trips: created } }),
                ]);
            })
            .then((createdOrder) => res.send(createdOrder))
            .catch(next)
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { status } = req.body;
        models.Order.update({ _id: id }, { status })
            .then((updatedTOrder) => res.send(updatedTOrder))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        const { _id, trips } = req.user;
        const index = trips.indexOf(id)
        console.log(req.body);
        models.Order.findOneAndDelete({ _id: id })
            .then(deleted => {
                console.log('deleted', deleted);
                return Promise.all([
                    models.User.updateOne({ _id: deleted.user }, { $pull: { trips: id }}),
                ]);
            })
            .then((removedOrder) => res.send(removedOrder))
            .catch(next)
    }
};