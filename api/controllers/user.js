const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');

module.exports = {
    get: (req, res, next) => {
        const id = req.query.id
        models.User.findById(id).populate({
            path: 'trips',
            // Get friends of friends - populate the 'friends' array for every friend
            populate: { path: 'mainTrip' }
        })
            .then((user) => res.send(user))
            .catch(next)
    },

    post: {
        register: (req, res, next) => {
            const { username, password } = req.body;
            models.User.create({ username, password })
                .then((createdUser) => res.send(createdUser))
                .catch(next)
        },

        login: (req, res, next) => {
            const { username, password } = req.body;
            models.User.findOne({ username })
                .then((user) => user ? Promise.all([user, user.matchPassword(password)]) : [null, false])
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send('Invalid username or password');
                        return;
                    }

                    const userObj = {
                        id: user._id,
                        username: user.username,
                        isAdmin: user.isAdmin
                    }

                    const token = utils.jwt.createToken({ id: user._id });
                    const cookieValue = `${token}:${userObj.id}`
                    res.cookie(config.authCookieName, cookieValue).send(userObj);
                })
                .catch(next);
        },

        logout: (req, res, next) => {
            const token = req.cookies[config.authCookieName];
            console.log('-'.repeat(100));
            console.log(token);
            console.log('-'.repeat(100));
            models.TokenBlacklist.create({ token })
                .then(() => {
                    res.clearCookie(config.authCookieName).send('Logout successfully!');
                })
                .catch(next);
        }
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { username, password } = req.body;
        models.User.update({ _id: id }, { username, password })
            .then((updatedUser) => res.send(updatedUser))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.User.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next)
    }
};