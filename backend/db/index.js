const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions : {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});

const makeProjectModel = require('./projectModel.js');
const makeUserModel = require('./userModel.js');

authenticate = async (sequelize) => {
    try {
        await sequelize.authenticate();
        console.log('connection has been established successfully.');
    } catch (error) {
        console.error('unable to connect to the database:', error);
    }
};

authenticate(sequelize);

const db = {
    Sequelize,
    sequelize,
    Project : makeProjectModel(Sequelize, sequelize),
    User: makeUserModel(Sequelize, sequelize),
}

module.exports = db;