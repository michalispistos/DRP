const makeUserModel = (Sequelize, sequelize) => {
    const User = sequelize.define('user', {

        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        bio: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        degree: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        degree_level: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        skills: {
            type: Sequelize.ARRAY(Sequelize.STRING),
        }, 
        projects: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            default: [],
        },
        applications: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            default: [],
        },
    
    });
    
    return User;
}

module.exports = makeUserModel;