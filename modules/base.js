const Output = require('./../util/print-output');
const InputReader = require('./../util/get-input');

class BaseCommand {
    output = new Output();
    reader = new InputReader();

    continuousArgs = ['-c, --continuous', 'Keep open'];
}

module.exports = BaseCommand;

