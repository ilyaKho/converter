import { Command } from 'commander';
import { convert } from './controllers/converterService';
const program = new Command();
program.option('-e, --ext <char> ', 'Extension name')
program.option('-q, --quality <number> ', 'jpg quality only')
program.parse();
const options = program.opts();

new Promise(async (resolve, reject)=>{
    try {
        let result = await convert({
            filename: program.args[0],
            extention: program.args[1],
            quality: options.q
        })
        resolve(result)
    } catch (error) {
        console.log(error)
        reject(error)
    }
})


