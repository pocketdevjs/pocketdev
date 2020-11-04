#!/usr/bin/env node

const {Command} = require('commander');
const program = new Command();
const JwtCommand = require('./modules/jwt');
const TimeCommand = require('./modules/time');
const UrlCommand = require('./modules/url');
const CryptoCommand = require('./modules/hash');
const RegexCommand = require('./modules/regex');
const Base64Command = require('./modules/base64');
const ColorCommand = require('./modules/color');
const JsonCommand = require('./modules/json');

program.version('0.0.1');


program.addCommand(new JwtCommand().create());
program.addCommand(new Base64Command().create());
program.addCommand(new TimeCommand().create());
program.addCommand(new RegexCommand().create());
program.addCommand(new CryptoCommand().create());
program.addCommand(new UrlCommand().create());
program.addCommand(new JsonCommand().create());
program.addCommand(new ColorCommand().create());


program.parse(process.argv);


