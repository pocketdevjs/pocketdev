const crypto = require('crypto');
const {Command} = require('commander');
const BaseCommand = require('./base');

class CryptoCommand extends BaseCommand{

    create() {
        const cmd = new Command('crypto');
        cmd
            .command('hash [algorithm] [data]')
            .option(...this.continuousArgs)
            .action((algorithm, data, c) => this.reader.start(
                input => this.hash(algorithm, input),
                data,
                c.continuous
            ));

        return cmd;
    }


    hash(algorithm, data) {
        try{
            const hash = crypto.createHash(algorithm);
            hash.update(data);
            this.output.print(hash.digest('hex'));
        }catch (e) {
            this.output.error(e.message)
        }
    }
}

module.exports = CryptoCommand;
