const uuid = require('uuid');
const path = require('path');
const { Organization } = require('../models/models');
const ApiError = require('../error/ApiError');

class OrganizationController {
    async create(req, res, next) {
        try {
            const { name, email, phone, description, category} = req.body;
            const { cover_img } = req.files;

            let fileName = uuid.v4() + ".jpg";
            cover_img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const organization = await Organization.create({ name, email, phone, description, category, cover_img: fileName })
            return res.json(organization);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let organization = await Organization.findAll();
        return res.json(organization);
    }

    async getOne(req, res) {
        const { id } = req.params;
        
        const organization = await Organization.findOne({
            where: { id }
        })
        return res.json(organization);
    }
};

module.exports = new OrganizationController();