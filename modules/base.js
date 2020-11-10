const Output = require('./../util/print-output');
const InputReader = require('./../util/get-input');

class BaseCommand {

    constructor() {
        this.output = new Output();
        this.reader = new InputReader();
        this.continuousArgs = ['-c, --continuous', 'Keep open'];
    }

}

module.exports = BaseCommand;

