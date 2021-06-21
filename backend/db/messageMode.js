const makeMessageModel = (Sequelize, sequelize) => {
    const Message = sequelize.define('message', {
        messages: {
            type: Sequelize.ARRAY(Sequelize.JSON),
        }
    });

    return Message;
}

module.exports = makeMessageModel;