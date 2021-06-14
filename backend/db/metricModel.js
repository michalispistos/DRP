const makeMetricModel = (Sequelize, sequelize) => {
    const Metric = sequelize.define('metric', {
        name: {
            type: Sequelize.STRING,
        },
        data: {
            type: Sequelize.ARRAY(Sequelize.DOUBLE),
        }
    });

    return Metric;
}

module.exports = makeMetricModel;