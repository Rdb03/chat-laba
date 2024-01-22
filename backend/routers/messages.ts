import {Router} from "express";
import fileDb from "../fileDb";
import {MessageWithOutId} from "../type";

const messageRouter = Router();

messageRouter.get('/', async (req, res) => {
    const messages = await fileDb.getItems();
    res.send(messages);
});

messageRouter.get('/:id', async (req, res) => {
    const messages = await fileDb.getItems();
    const product = messages.find(m => m.id === req.params.id);
    res.send(product);
});

messageRouter.post('/', async (req, res) => {
    const message: MessageWithOutId = {
        author: req.body.author,
        message: req.body.message,
    };

    const newMessage = await fileDb.addItem(message);
    res.send(newMessage);
});


export default messageRouter;