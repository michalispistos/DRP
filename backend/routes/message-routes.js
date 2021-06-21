const { Router } = require('express');
const Sequelize = require('sequelize');

const makeMessageRouter = (db) => {
    const messageRouter = Router();

    messageRouter.route("/:id").put(async (req, res) => {
        const { new_message } = req.body;
        const { id } = req.params;

        await db.Message.update(
            {messages: Sequelize.fn("array_append", Sequelize.col("messages"), JSON.stringify(new_message))},
            {where: {id,}},
          ).then(rowsUpdated=> res.json(rowsUpdated)).catch(err => console.log(err));
    });

    messageRouter.route('/').get(async (req, res) => {
        res.json(await db.Message.findAll());
    });


    return messageRouter;

}

module.exports = makeMessageRouter;