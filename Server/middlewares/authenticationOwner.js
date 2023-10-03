const { verifyToken } = require("../helpers/jwt");
const { ProjectOwner } = require('../models');

async function authenticationOwner(req, res, next) {
    try {
        console.log(req.headers);
        // proses pengecekan apakah client mengirimkan headers access_token
        const { access_token } = req.headers;
        if (!access_token) {
            throw { name: 'unauthenticated' }
        }

        // proses decoding access_token
        const payload = verifyToken(access_token);
        // console.log(payload, '<<<<THIS IS PAYLOAD');

        // proses pengecekan apakah owner ada di db atau tidak
        const findOwner = await ProjectOwner.findByPk(payload.id)
        if (!findOwner) {
            throw { name: 'unauthenticated' }
        }

        // proses penyimpanan data ke req (sementara)
        // console.log(findOwner, '<<< INI USER')

        req.projectOwner = {
            id: findOwner.id,
            email: findOwner.email
        }

        // console.log(req.projectOwner, '<<< INI DI AUTHENTICATION OWNER');

        next();        
    } catch (error) {
        console.log(error, '<<<<< ini catch errornya Owner');
        next(error);
    }
}

module.exports = authenticationOwner;