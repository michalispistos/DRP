const makeProjectModel = (Sequelize, sequelize) => {
    const Project = sequelize.define('project', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        looking_for: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        paid: {
            type: Sequelize.BOOLEAN,
            default: 'false',
        },

        leader: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        members: {
            type: Sequelize.ARRAY(Sequelize.STRING),
        },

        tags: {
            type: Sequelize.ARRAY(Sequelize.STRING),
        },

        duration: {
            type: Sequelize.STRING,
            default: "Indefinite",
        },
    });
    
    return Project;
}

module.exports = makeProjectModel;