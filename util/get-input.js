const readline = require("readline");

module.exports = class InputReader {

    start(cb, initial, keepOpen) {
        if (initial) cb(initial);

        if (initial && !keepOpen) return;

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const question = () => rl.question(">", (input) => {
            cb(input);
            if (!keepOpen) rl.close();
            else question();
        });

        question();

        rl.on("close", () => process.exit(0));
    }
};
