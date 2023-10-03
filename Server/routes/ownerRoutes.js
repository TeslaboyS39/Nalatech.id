const express = require('express');
const ownerRouter = express.Router();
const Controller = require('../controllers/index')
const authenticationOwner = require('../middlewares/authenticationOwner');
const errorHandler = require('../middlewares/errorHandlers');

ownerRouter.post('/register', Controller.registerOwner);
ownerRouter.post('/login', Controller.loginOwner);

ownerRouter.use(authenticationOwner);

ownerRouter.post('/project', Controller.addProject);

ownerRouter.get('/mitra', Controller.showAllMitras)
ownerRouter.get('/mitra/:id', Controller.showOneMitra)

ownerRouter.get('/contract', Controller.showAllContracts) // oleh owner
// ownerRouter.patch('/contract', Controller.updateStatus) // oleh owner
ownerRouter.patch('/contract/:ContractId', Controller.acceptContract) // oleh owner

ownerRouter.post('/generate-midtrans-token', Controller.midtransTokenGenerator) // endpoint untuk untuk generate token midtrans(belum nambahin balance si mitra)

ownerRouter.use(errorHandler);

module.exports = ownerRouter;