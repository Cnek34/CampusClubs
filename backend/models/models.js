const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    full_name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, unique: true }
});

const Organization = sequelize.define('organization', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    phone: { type: DataTypes.STRING, unique: true },
    cover_img: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT },
    category: { type: DataTypes.STRING }
});

const Membership = sequelize.define('membership', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, defaultValue: 'member' }, //может быть moderator, event_manager, leader
});

const Application = sequelize.define('application', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    resume_url: { type: DataTypes.TEXT },
    motivation: { type: DataTypes.TEXT },
    comment: { type: DataTypes.TEXT },
    interview_at: { type: DataTypes.DATE }
});

const Announcement = sequelize.define('announcement', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT }
});

const Document = sequelize.define('document', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    file_url: { type: DataTypes.TEXT }
});

const OrganizationReport = sequelize.define('organization_report', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    members_count: { type: DataTypes.INTEGER },
    events_count: { type: DataTypes.INTEGER },
    file_url: { type: DataTypes.TEXT }
});

const Event = sequelize.define('event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    type: { type: DataTypes.STRING },
    location: { type: DataTypes.TEXT },
    starts_at: { type: DataTypes.DATE },
    ends_at: { type: DataTypes.DATE },
    is_public: { type: DataTypes.BOOLEAN },
    capacity: { type: DataTypes.INTEGER }
});

const EventFeedback = sequelize.define('event_feedback', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER },
    comment: { type: DataTypes.TEXT }
});

const EventRegistration = sequelize.define('event_registration', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    attended: { type: DataTypes.BOOLEAN }
});

User.hasMany(Membership);
Membership.belongsTo(User);

Organization.hasMany(Membership);
Membership.belongsTo(Organization);

Organization.hasMany(Application);
Application.belongsTo(Organization);

User.hasMany(Application);
Application.belongsTo(User);

User.hasMany(Announcement);
Announcement.belongsTo(User);

Organization.hasMany(Announcement);
Announcement.belongsTo(Organization);

User.hasMany(Document);
Document.belongsTo(User);

Organization.hasMany(Document);
Document.belongsTo(Organization);

User.hasMany(OrganizationReport);
OrganizationReport.belongsTo(User);

Organization.hasMany(OrganizationReport);
OrganizationReport.belongsTo(Organization);

Organization.hasMany(Event);
Event.belongsTo(Organization);

Event.hasMany(EventFeedback);
EventFeedback.belongsTo(Event);

User.hasMany(EventFeedback);
EventFeedback.belongsTo(User);

Event.hasMany(EventRegistration);
EventRegistration.belongsTo(Event);

User.hasMany(EventRegistration);
EventRegistration.belongsTo(User);

module.exports = {
    User,
    Organization,
    Membership,
    Application,
    Announcement,
    Document,
    OrganizationReport,
    Event,
    EventFeedback,
    EventRegistration
};