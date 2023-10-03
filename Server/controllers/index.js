const { comparePasswords } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const { User, ProjectOwner, Project, Contract, Transaction, ForumPost } = require('../models');
const {OAuth2Client} = require('google-auth-library');
const { Op } = require('sequelize');
const midtransClient = require('midtrans-client');

class Controller {
    static async register(req, res, next) {
        try {
            const { userName, email, password, profileUrl, contact, description } = req.body;

            const user = await User.create({ userName, email, password, profileUrl, contact, description })

            res.status(201).json({ message: `User with id ${user.id} is created` });
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) {
                throw { name: 'badRequest', message: 'Email cannot be empty' };
            }
    
            if (!password) {
                throw { name: 'badRequest', message: 'Password cannot be empty' };
            }

            const user = await User.findOne({ where: { email } })

            if (!user) {
                throw { name: 'unauthenticated', message: 'Invalid email' };
            }

            const validPass = comparePasswords(password, user.password);
            console.log(validPass);

            if (!validPass) {
                throw { name: 'unauthenticated', message: 'Invalid password' };
            }

            const access_token = createToken({ id: user.id });
            // console.log(access_token);
            res.status(200).json({ access_token, userName: user.userName })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async registerOwner(req, res, next) {
        try {
            const { name, email, password, contact, description, website, photoUrl } = req.body;

            const owner = await ProjectOwner.create({ name, email, password, contact, description, website, photoUrl })

            res.status(201).json({ message: `Project Owner with id ${owner.id} is created` });
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    static async loginOwner(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) {
                throw { name: 'badRequest', message: 'Email cannot be empty' };
            }
    
            if (!password) {
                throw { name: 'badRequest', message: 'Password cannot be empty' };
            }

            const owner = await ProjectOwner.findOne({ where: { email } })

            if (!owner) {
                throw { name: 'unauthenticated', message: 'Invalid email' };
            }

            const validPass = comparePasswords(password, owner.password);
            console.log(validPass);

            if (!validPass) {
                throw { name: 'unauthenticated', message: 'Invalid password' };
            }

            const access_token = createToken({ id: owner.id });
            // console.log(access_token);
            res.status(200).json({ access_token, name: owner.name })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async showAllProjects(req, res, next) {
        try {
            const projects = await Project.findAll({
                include: [ProjectOwner],
            })

            res.status(200).json(projects);
        } catch (error) {
            next(error)
        }
    }

    static async showOneProject(req, res, next) {
        try {
            const { id } = req.params;

            const project = await Project.findByPk(id, {
                include: [ProjectOwner]
            });

            if (!project) {
                throw { name: 'projectNotFound' };
            }

            res.status(200).json(project);
        } catch (error) {
            // console.log(error, '<<<<<<')
            next(error);
        }
    }

    static async addProject(req, res, next) {
        // console.log(req.body);
        try {
            const { title, description } = req.body;

            const newProject = await Project.create({
                title,
                description,
                OwnerId: req.projectOwner.id
            });

            res.status(201).json({message: `Project with id ${newProject.id} has been created`, newProject });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async showAllMitras(req, res, next) {
        try {
            const mitras = await User.findAll({
                where: {
                    role: "mitra"
                }
            })

            res.status(200).json(mitras);
        } catch (error) {
            next(error)
        }
    }

    static async showOneMitra(req, res, next) {
        try {
            const { id } = req.params;

            const mitra = await User.findByPk(id);

            if (!mitra || mitra.role !== 'mitra') {
                throw { name: 'mitraNotFound' };
            }

            res.status(200).json(mitra);
        } catch (error) {
            // console.log(error, '<<<<<<')
            next(error);
        }
    }

    static async showAllContracts(req, res, next) {
        try {
            console.log('Fetching contracts...');
            const contracts = await Contract.findAll({
                include: [Project, User],
                where: {
                    ProjectId: req.projectOwner.id
                }
            })

            console.log('Contracts:', contracts);

            res.status(200).json(contracts);
        } catch (error) {
            next(error)
        }
    }

    static async createContract(req, res, next) {
        try {
            const { ProjectId } = req.body
            
            // pengajuan kontrak baru dengan status "waiting"
            const newContract = await Contract.create({
                ProjectId,
                UserId: req.user.id, // dapat userId dari authentikasi
                status: 'waiting'
            });
    
            res.status(201).json({ message: 'Contract application created', contract: newContract });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    // static async updateStatus(req, res, next) {
    //     try {
    //         const { id } = req.params;
    //         let { status } = req.body;

    //         let updatedStatus = await Contract.update({ status }, {
    //             where: { id }
    //         });

    //         res.status(200).json({ message: 'Contract status updated successfully', updatedStatus });
    //     } catch (error) {
    //         next(error);
    //         // 404 & 403
    //     }
    // }

    static async acceptContract(req, res, next) {
        try {
            const { ContractId } = req.params;
            const OwnerId = req.projectOwner.id;
            const { amount } = req.body;
    
            // Cek apakah kontrak dengan ID tersebut benar-benar dimiliki oleh owner yang sedang login
            const contract = await Contract.findByPk(ContractId);
    
            if (!contract) {
                throw { name: 'contractNotFound' };
            }
    
            // Update status kontrak menjadi "accepted"
            await contract.update({
                status: 'accepted'
            });
    
            // Buat transaksi baru
            const newTransaction = await Transaction.create({
                ContractId,
                OwnerId,
                UserId: contract.UserId,
                amount
            });

            console.log(newTransaction, '<<< INI LOHHH');
    
            res.status(200).json({ message: 'Contract accepted', transaction: newTransaction });
        } catch (error) {
            next(error);
        }
    }

    static async midtransTokenGenerator(req, res, next) {
        try {
            const findOwner = await ProjectOwner.findByPk(req.projectOwner.id)

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : process.env.MIDTRANS_SERVER_KEY
            });
            
            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000), // must be unique
                    "gross_amount": 10000000 // payment value here
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    // "first_name": "budi",
                    // "last_name": "pratama",
                    "email": findOwner.email,
                    // "phone": "08111222333"
                }
            };

            const midtransToken = await snap.createTransaction(parameter);

            // console.log(midtransToken, 'ini token midtrans');
            res.status(201).json(midtransToken)
        } catch (error) {
            next(error)
        }
    }

    static async news (req, res, next) {
        const axios = require('axios');

        const options = {
            method: 'GET',
            url: 'https://news-api14.p.rapidapi.com/top-headlines',
            params: {
              country: 'us',
              language: 'en',
              pageSize: '10',
              category: 'sports'
            },
            headers: {
              'X-RapidAPI-Key': '1bee505ea2mshb9ec4f2aa62fecfp118f79jsn420f711420e0',
              'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'
            }
          };
        
        try {
            const response = await axios.request(options);
            console.log(response.data);
            res.status(200).json(response.data)
        } catch (error) {
            console.error(error);
            next(error)
        }
    }

    static async userGoogleLogin(req, res, next) {
        try {
            console.log('tes kena begal gak');
            const { credential } = req.headers;
            const client = new OAuth2Client();

            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID, 
            });

            const payload = ticket.getPayload();

            // console.log(payload, '<<<<<');
            const [user, isCreated] = await User.findOrCreate({
                where: {
                    email:payload.email
                },
                defaults: {
                    userName: payload.name,
                    email: payload.email,
                    password: String(Math.floor(Math.random() * 88888) + 11111), // rentang keacakan pw login google dari 11111 - 99999
                    role: 'mitra',
                    contact: 'N/A',
                    description: 'N/A'
                },
                hook: false,
            });

            // console.log(user, '<<<< INI USER BRO');
            // console.log(isCreated, '<<<< INI ISCREATED BRO');
            const access_token = createToken({
                id: user.id
            });

            let status = 200;
            if (isCreated) status = 201;

            res.status(status).json({ access_token, userName: user.userName })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;