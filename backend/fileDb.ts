import {promises as fs} from 'fs';
import {Messages, MessageWithOutId} from "./type";

const fileName = './db.json';
let data: Messages[] = [];

const fileDb = {
  async init() {
      try {
          const fileContents = await fs.readFile(fileName);
          data = JSON.parse(fileContents.toString());
      } catch (e) {
          data = [];
      }
  },
    async getItems() {
      return data;
    },
    async addItem(item: MessageWithOutId) {
      const id = crypto.randomUUID();
      const message = {id, ...item}
      data.push(message);
      await this.save();

      return message;
    },
    async save() {
      return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;