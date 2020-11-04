const {Command} = require('commander');
const BaseCommand = require('./base');

class Base64Command extends BaseCommand{

    create() {
        const cmd = new Command('base64');

        cmd
            .command('decode [data]')
            .option(...this.continuousArgs)
            .action((data, c) => this.reader.start(
                input => this.fromBase64(input),
                data,
                c.continuous
            ));

        cmd
            .command('encode [data]')
            .option(...this.continuousArgs)
            .action((data, c) => this.reader.start(
                input => this.toBase64(input),
                data,
                c.continuous
            ));

        return cmd;
    }

    toBase64(data) {
       this.output.print(Buffer.from(data).toString('base64'));
    }

    fromBase64(data) {
        this.output.print(Buffer.from(data, 'base64').toString('ascii'));
    }
}

module.exports = Base64Command;
