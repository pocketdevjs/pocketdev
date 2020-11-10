const {v4} = require('uuid');
const BaseCommand = require('./base');
const {Command} = require('commander');

class UuidCommand extends BaseCommand {

    create() {
        const cmd = new Command('uuid');

        cmd.action(() => this.nextV4());

        return cmd;
    }

    nextV4() {
        this.output.print(v4());
    }


}

module.exports = UuidCommand;
