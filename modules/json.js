const {Command} = require('commander');
const BaseCommand = require('./base');
const prettyjson = require('prettyjson');

class JsonCommand extends BaseCommand {

    create() {
        const cmd = new Command('json');

        cmd
            .command('pretty-data [data]')
            .option(...this.continuousArgs)
            .action((data, c) => this.reader.start(
                input => this.dataPrint(input),
                data,
                c.parent.continuous
            ));
        cmd
            .command('pretty-json [data]')
            .option(...this.continuousArgs)
            .action((data, c) => this.reader.start(
                input => this.prettyPrint(input),
                data,
                c.parent.continuous
            ));
        return cmd;
    }

    dataPrint(input) {
        try {
            const obj = JSON.parse(input);
            this.output.print("");
            this.output.print(prettyjson.render(obj, {}));
        } catch (e) {
            this.output.error(e.message);
        }
    }

    prettyPrint(input) {
        try {
            const obj = JSON.parse(input);
            this.output.print("");
            this.output.print(JSON.stringify(obj, null, 2));
        } catch (e) {
            this.output.error(e.message);
        }
    }
}

module.exports = JsonCommand;
