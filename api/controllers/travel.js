const models = require('../models');

module.exports = {
    get: {
        all: (req, res, next) => {
            models.Travel.find().populate('participants')
                .then((travel) => res.send(travel))
                .catch(next);
        },
        single: (req, res, next) => {
            const id = req.params.id;

            models.Travel.findOne({_id: id}).populate('participants')
                .then((travel) => res.send(travel))
                .catch(next);
        }
    },

    post: (req, res, next) => {
        const { destination, startDate, imageUrl, description, duration, price, additionalTrips } = req.body;
        const { _id } = req.user;

        models.Travel.create({ destination, startDate, imageUrl, description, duration, price, additionalTrips: [...additionalTrips], participants: [] })
            // .then((created) => {
            //     return Promise.all([
            //         models.User.updateOne({ _id }, { $push: { posts: createdOrigami } }),
            //         models.Origami.findOne({ _id: createdOrigami._id })
            //     ]);
            // })
            .then(([modifiedObj, travelObj]) => {
                res.send(travelObj);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { destination, startDate, imageUrl, program, duration, price } = req.body;
        models.Travel.updateOne({ _id: id }, { destination, startDate, imageUrl, program, duration, price })
            .then((updatedTravel) => res.send(updatedTravel))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Travel.deleteOne({ _id: id })
            .then((removedTravel) => res.send(removedTravel))
            .catch(next)
    }
};