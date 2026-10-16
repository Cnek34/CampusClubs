const { Membership, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class MembershipController {
    async create(req, res, next) {
        try {
            const { userId, organizationId, role } = req.body;

            const membership = await Membership.create({ userId, organizationId, role });
            return res.json(membership);

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const { organizationId } = req.params;

            const memberships = await Membership.findAll({
                where: { organizationId },
                include: [{
                    model: User,
                    attributes: { exclude: ['password'] }
                }]
            });

            return res.json(memberships);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res) {
        try {
            const { organizationId, userId  } = req.params;

            const membership = await Membership.findAll({
                where: { organizationId, userId },
                include: [{
                    model: User,
                    attributes: { exclude: ['password'] }
                }]
            });

            return res.json(membership);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
};

module.exports = new MembershipController();