import { Command } from 'commander';
const program = new Command();
program.option('-e, --ext <char> ', 'Extension name')
program.parse();
const options = program.opts();

// new Promise(async (resolve, reject) => {
//   try {
//     await conterFilesFromDir({
//       pathFrom: program.args[0],
//       pathTo: program.args[1],
//       extention: options.ext
//     })
//     resolve(console.log('Все сделали'))
//   } catch (error) {
//     console.log(error)
//     reject(error)
//   }
// })
