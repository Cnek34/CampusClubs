const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const generateJwt = ( id, email, fullName ) => {
    return jwt.sign({
            id,
            email, 
            fullName
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '24h'
        }
    )
};

class UserController {
    async registration(req, res, next) {
        const { email, password, full_name, phone } = req.body;
        if (!email || !password) {
            return next(ApiError.badReqest('Некорректный email или password'))
        }

        const candidate = await User.findOne({
            where: { email }
        })
        if (candidate) {
            return next(ApiError.badReqest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            email,
            password: hashPassword,
            full_name,
            phone
        })

        const token = generateJwt(user.id, user.email, user.full_name);

        return res.json({token});
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        })
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }

        const token = generateJwt(user.id, user.email, user.full_name);
        return res.json({token});
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.full_name);
        return res.json({token});
    }
};

module.exports = new UserController();