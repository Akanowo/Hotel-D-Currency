const router = require('express').Router()
const CONTACT = require('./contact.route');

const routers = () => {

    router.use('/booking', CONTACT());

    return router;

}

module.exports = routers;
