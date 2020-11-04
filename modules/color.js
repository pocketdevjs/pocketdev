const {Command} = require('commander');
const BaseCommand = require('./base');

class ColorCommand extends BaseCommand {

    create() {
        const cmd = new Command('color');

        cmd
            .command('hex2rgb [hex]')
            .option(...this.continuousArgs)
            .action((data, c) => this.reader.start(
                input => this.hexToRgb(input),
                data,
                c.continuous
            ));

        cmd
            .command('rgb2hex [rgb]')
            .option(...this.continuousArgs)
            .action((data, c) => this.reader.start(
                input => this.rgbToHex(input),
                data,
                c.continuous
            ));

        return cmd;
    }


    componentToHex(c) {
        const n = parseInt(c);

        if(isNaN(n))
            throw new Error('Invalid RGB format');

        const hex = n.toString(16).toUpperCase();
        return hex.length === 1 ? "0" + hex : hex;
    }

    rgbToHex(rgb) {
        try {
            const parts = rgb
                .replace('rgb(', '')
                .replace(')', '')
                .split(',');

            const r = parts[0];
            const g = parts[1];
            const b = parts[2];

            const hex = "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
            this.output.print(hex);
        } catch (e) {
            this.output.error('Invalid RGB format')
        }

    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        const rgb = result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;

        if (!rgb) {
            this.output.error('Invalid Hex Format');
            return;
        }

        this.output.print(`rgb(${rgb.r},${rgb.g},${rgb.b})`)
    }
}

module.exports = ColorCommand;
