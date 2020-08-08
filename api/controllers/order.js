const models = require('../models');

module.exports = {
    get: {
        all: (req, res, next) => {
            models.Order.find().populate('mainTrip', 'user')
                .then((orders) => res.send(orders))
                .catch(next);
        },
        single: (req, res, next) => {
            const id = req.params.id;

            models.Order.findOne({_id: id}).populate('mainTrip', 'user')
                .then((order) => res.send(order))
                .catch(next);
        }
    },

    post: (req, res, next) => {
        const { mainTrip, totalPrice, additionalTrips } = req.body;
        const { _id } = req.user;
        console.log(_id)

        models.Order.create({ mainTrip, totalPrice, additionalTrips, user: _id })
            .then((created) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { trips: created } }),
                ]);
            })
            .then((createdOrder) => res.send(createdOrder))
            .catch(next)
    }
};