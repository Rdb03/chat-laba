import {promises as fs} from 'fs';

const fileName = './text.txt';

const run = async () => {
    try {
        await fs.writeFile(fileName, 'Hello, World');
        console.log('File was saved!');
    } catch (err) {
        console.error(err);
    }
};

void run();