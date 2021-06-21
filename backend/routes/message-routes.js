const { Router } = require('express');

const makeMessageRouter = (db) => {
    const messageRouter = Router();

    messageRouter.route("/:id").put(async (req, res) => {
        const { message } = req.body;
        await db.Message.update(
            {messages: Sequelize.fn("array_append", Sequelize.col("messages"), message)},
            {where: {id,}},
          ).then(rowsUpdated=> res.json(rowsUpdated)).catch(err => console.log(err));
    });


    return messageRouter;

}

module.exports = makeMessageRouter;