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
            type: Sequelize.ARRAY(Sequelize.JSON),
        },

        tags: {
            type: Sequelize.ARRAY(Sequelize.STRING),
        },

        location: {
            type: Sequelize.STRING,
            default: "Remote",
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        amount_to_be_paid: {
            type: Sequelize.STRING,
            default: "0",
        },

        image_filepath: {
            type: Sequelize.STRING,
            default: "default.jpg",  
        },

        duration: {
            type: Sequelize.STRING,
            default: "Indefinite",
        },
    });
    
    return Project;
}

module.exports = makeProjectModel;