const { Router } = require('express');

const makeMetricRouter = (db) => {
    const metricRouter = Router();

    metricRouter.route('/').get(async (req, res) => {
        try {
            const metrics = await db.Metric.findAll();
            res.json(metrics);
        } catch (err) {
            console.error(err.message);
        }  
    }).post(async (req, res) => {
        try {
            const { name, data } = req.body;
            const metric = await db.Metric.create({
                name,
                data,
            });
            res.json(metric);
        } catch (err) {
            console.error(err.message);
        }  
    });

    metricRouter.route('/:name').get(async (req, res) => {
        try {
            const { name } = req.params;
            const metrics = await db.Metric.findAll({
                where: {
                    name,
                }
            });
            res.json(metrics);
        } catch (err) {
            console.error(err.message);
        }
    });


    return metricRouter;

}

module.exports = makeMetricRouter;