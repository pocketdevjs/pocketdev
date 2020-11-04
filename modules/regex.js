const {Command} = require('commander');
const BaseCommand = require('./base');

class RegexCommand extends BaseCommand{

    create() {
        const cmd = new Command('regex');
        cmd
            .command('test [regex] [string]')
            .action((regex, string) => this.testRegex(regex, string));

        cmd
            .command('match [regex] [string]')
            .action((regex, string) => this.matchRegex(regex, string));

        return cmd;
    }


    testRegex(regex, string) {
        let r;
        if (regex.includes('/')) {
            const parts = regex.split('/');
            r = new RegExp(parts[1], parts[2]);
        } else {
            r = new RegExp(regex);
        }

        this.output.print('Test: ' + r.test(string));
    }

    matchRegex(regex, string) {
        let r;
        if (regex.includes('/')) {
            const parts = regex.split('/');
            r = new RegExp(parts[1], parts[2]);
        } else {
            r = new RegExp(regex);
        }

        this.output.print('Match: ' + string.match(r));
    }
}

module.exports = RegexCommand;
