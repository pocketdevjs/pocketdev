const {Command} = require('commander');
const BaseCommand = require('./base');

class UrlCommand extends BaseCommand {

    create() {
        const cmd = new Command('url');

        cmd
            .command('decode [data]')
            .option(...this.continuousArgs)
            .action((data, c) => this.reader.start(
                input => this.decode(input),
                data,
                c.continuous
            ));

        cmd
            .command('encode [data]')
            .option(...this.continuousArgs)
            .action((data, c) => this.reader.start(
                input => this.encode(input),
                data,
                c.continuous
            ));
        return cmd;
    }

    decode(data) {
        this.output.print(
            decodeURI(data)
        );
    }

    encode(data) {
        this.output.print(
            encodeURI(data)
        );
    }
}

module.exports = UrlCommand;
