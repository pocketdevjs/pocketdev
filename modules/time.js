const {Command} = require('commander');
const BaseCommand = require('./base');

class TimeCommand extends BaseCommand {

    create() {
        const cmd = new Command('time');

        cmd
            .command('now')
            .action(() => this.printNow());

        cmd
            .command('humanize [timestamp]')
            .option(...this.continuousArgs)
            .action((data, c) => this.reader.start(
                input => this.humanize(input),
                data,
                c.parent.continuous
            ));

        return cmd;
    }


    printNow() {
        const date = Date.now();

        this.output.print(Math.floor(date / 1000).toString());
        this.output.print(date.toString());
        this.output.print(new Date(date).toLocaleString())
    }

    humanize(stamp) {
        if (stamp.length === 10)
            stamp *= 1000;

        const date = new Date(+stamp);
        this.output.print(date.toLocaleString())
    }
}

module.exports = TimeCommand;
