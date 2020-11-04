const {Command} = require('commander');
const jwt_decode = require('jwt-decode');
const BaseCommand = require('./base');

class JwtCommand extends BaseCommand {

    create() {
        const cmd = new Command('jwt');

        cmd
            .command('decode [data]')
            .option(...this.continuousArgs)
            .action((data, c) => this.reader.start(
                input => this.decodeJwt(input),
                data,
                c.parent.continuous
            ));

        return cmd;
    }


    decodeJwt(data) {
        try {
            const obj = jwt_decode(data);
            this.output.print(JSON.stringify(obj, null, 2));
        } catch (e) {
            this.output.error(e.message)
        }
    }
}

module.exports = JwtCommand;
