const express = require('express');
const router = express.Router();
const Controller = require('../controllers/index');
const authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorHandlers');

router.get('/', function(req, res) {
    res.status(200).json({ message: 'Hello World'})
})

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/google-login', Controller.userGoogleLogin);

router.use('/owner', require('./ownerRoutes'));
router.get('/news', Controller.news)
router.use(authentication);

router.get('/project', Controller.showAllProjects);
router.get('/project/:id', Controller.showOneProject);

router.post('/contract', Controller.createContract) // oleh user

router.use(errorHandler);

module.exports = router;