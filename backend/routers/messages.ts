import {Router} from "express";
import fileDb from "../fileDb";
import {MessageWithOutId} from "../type";

const messageRouter = Router();

messageRouter.get('/', async (req, res) => {
    const messages = await fileDb.getItems();
    const get30Messages = messages.slice(-30);
    res.send(get30Messages);
});

messageRouter.get('/:id', async (req, res) => {
    const messages = await fileDb.getItems();
    const product = messages.find(m => m.id === req.params.id);
    res.send(product);
});

messageRouter.post('/', async (req, res) => {
    const { author, message } = req.body;

    if (!author || !message || !author.trim() || !message.trim()) {
        return res.status(400).json({ error: "Author and message must be present in the request" });
    }

    const newMessage: MessageWithOutId = {
        author: author.trim(),
        message: message.trim(),
    };

    const savedMessage = await fileDb.addItem(newMessage);
    res.send(savedMessage);
});


export default messageRouter;