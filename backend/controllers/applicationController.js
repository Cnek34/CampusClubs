const { Application, User, Organization } = require('../models/models');
const ApiError = require('../error/ApiError');

class ApplicationController {
    async create(req, res, next) {
        try {
            const { userId, organizationId, motivation, resumeUrl } = req.body;

            const application = await Application.create({ userId, organizationId, motivation, resume_url: resumeUrl });
            return res.json(application);

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        try {
            const { organizationId, userId } = req.query;

            const where = {};
            const include = [];

            if (organizationId && !userId) {
                where.organizationId = organizationId;
                include.push({
                    model: User,
                    attributes: { exclude: ['password'] }
                });
            } else if (userId && !organizationId) {
                where.userId = userId;
                include.push({
                    model: Organization,
                    attributes: ['id', 'email', 'category', 'cover_img']
                });
            }

            const applications = await Application.findAll({
                where,
                include,
                order: [['createdAt', 'DESC']]
            });

            return res.json(applications);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
};

module.exports = new ApplicationController();