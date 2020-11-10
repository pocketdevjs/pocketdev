# Pocket Dev

This is a collection of handy cli tools for making developers everyday life easier.


## Installation
`npm install -g pocket-dev`

## Usage
##### General
`pd [tool] [cmd] [args]`

##### Help
`pd --help`

`pd help [cmd]`


Input can be specified inline or you can add the `-c` flag for entering the continuous mode.
Pocket-dev opens as an interative cli where you can continuiously paste your input:

`pd [tool] [cmd] [args] -c`

## Modules
#### Base64
`pd base64 encode fooBar`

`pd base64 decode Zm9vQmFy`

#### Color
`pd color hex2rgb #123456`

`pd color rgb2hex rgb(18,52,86)`

#### Crypto
`pd crypto hash sha512 foo`

#### Json
`pd json pretty-json`

`pd json pretty-data`

#### Jwt
`pd jwt decode`

#### Time
`pd time now`

`pd time humanize 1604233490`

#### Url
`pd url encode %foo§`

`pd url decode %25foo%C2%A7`

#### UUID
`pd uuid`
