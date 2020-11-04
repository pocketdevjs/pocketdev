const assert = require('assert');
const InputReader = require('./util/get-input');
const sinon = require('sinon');
const {describe, it, beforeEach, afterEach} = require("mocha");

const captureStream = stream => {
    const oldWrite = stream.write;
    let buf = '';

    stream.write = function (chunk, encoding, callback) {
        buf += chunk.toString();
        oldWrite.apply(stream, arguments);
    };

    return {
        unhook: () => {
            stream.write = oldWrite;
        },
        captured: () => buf
    };
};

const cmd = cmd => {
    const parts = cmd.split(' ');
    let index = 2;
    parts.forEach(p => {
        process.argv[index++] = p;
    });
    process.argv = process.argv.slice(0, index);
};

const run = () => {
    delete require.cache[require.resolve('./main.js')];
    require("./main.js");
};



describe('main.js', function () {
    let hook;
    beforeEach(function () {
        hook = captureStream(process.stdout);
    });

    afterEach(function () {
        hook.unhook();
        process.argv = process.argv.slice(0, 2);
    });

    const exp = (a) => {
        assert.strictEqual(hook.captured(), a)
    };
    
    it('should decode jwt"', function () {
        cmd('jwt decode eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiSm9obiIsImlhdCI6MTUxNjIzOTAyMn0.kteH-22XrxFPtkPoxk_TP5EsGiBJB2OLn3fAztHich0');
        run();
        exp('{\n  "sub": "123",\n  "name": "John",\n  "iat": 1516239022\n}\n')
    });

    it('should print error on invalid jwt"', function () {
        cmd('jwt decode abcde');
        run();
        exp('Invalid token specified: Cannot read property \'replace\' of undefined\n')
    });

    it('should encode base64"', function () {
        cmd('base64 encode test123');
        run();
        exp('dGVzdDEyMw==\n')
    });

    it('should decode base64"', function () {
        cmd('base64 decode dGVzdDEyMw==');
        run();
        exp('test123\n')
    });

    it('should convert hex to rgb"', function () {
        cmd('color hex2rgb #1234AB');
        run();
        exp('rgb(18,52,171)\n')
    });

    it('should convert rgb to hex"', function () {
        cmd('color rgb2hex rgb(18,52,171)');
        run();
        exp('#1234AB\n')
    });

    it('should print error on invalid rgb"', function () {
        cmd('color rgb2hex rgb18,52,171)');
        run();
        exp('Invalid RGB format\n')
    });

    it('should convert timestamp to human date"', function () {
        cmd('time humanize 1603015503475');
        run();
        exp('2020-10-18 12:05:03\n')
    });

    it('should print current time"', function () {
        sinon.stub(Date, 'now').callsFake(() => 1603015503475);

        cmd('time now');
        run();
        exp('1603015503\n1603015503475\n2020-10-18 12:05:03\n')
    });

    it('should format json"', function () {
        sinon.stub(InputReader.prototype, 'start').callsFake((cb) => {
            cb('{"test":123}')
        });

        cmd('json pretty-json');
        run();
        exp('\n{\n  "test": 123\n}\n')

        InputReader.prototype.start.restore();
    });

    it('should print json data"', function () {
        sinon.stub(InputReader.prototype, 'start').callsFake((cb) => {
            cb('{"test":123}')
        });

        cmd('json pretty-data');
        run();
        exp('\n\u001b[32mtest: \u001b[39m\u001b[34m123\u001b[39m\n');

        InputReader.prototype.start.restore();
    });

    it('should print error on invalid json"', function () {
        sinon.stub(InputReader.prototype, 'start').callsFake((cb) => {
            cb('{"test:123}')
        });

        cmd('json pretty-json');
        run();
        exp('Unexpected end of JSON input\n');

        InputReader.prototype.start.restore();
    });

    it('should url encode"', function () {
        sinon.stub(InputReader.prototype, 'start').callsFake((cb) => {
            cb('!"abc123&.,--(§$%&/\\')
        });

        cmd('url encode');
        run();
        exp('!%22abc123&.,--(%C2%A7$%25&/%5C\n');

        InputReader.prototype.start.restore();
    });

    it('should url decode"', function () {
        sinon.stub(InputReader.prototype, 'start').callsFake((cb) => {
            cb('!%22abc123&.,--(%C2%A7$%25&/%5C')
        });

        cmd('url decode');
        run();
        exp('!"abc123&.,--(§$%&/\\\n');

        InputReader.prototype.start.restore();
    });

    it('should hash input with sha256"', function () {
        cmd('crypto hash sha256 test1223');
        run();
        exp('272bc39ac3e573b124fdf3531af0eb4e1b74d4b2cba6a36689cda4c2a827abec\n')
    });

    it('should hash input with sha512"', function () {
        cmd('crypto hash sha512 abc!!!');
        run();
        exp('56c2b9cf602b3f9ce4f3c826ce8c6f418ae48adc1d2adde5bf1f88f4eb9a309a6f67ada3e0ba7033ab38fc4849f02d7d156b124a9cf55354425288608a9b90c4\n')
    });

    it('should print error on invalid hash algorithm"', function () {
        cmd('crypto hash sha257 test1223');
        run();
        exp('Digest method not supported\n')
    });
});
