![Slark logo](logo.png)

# Lightslark server

This is the server of Lightslark, the light version of Slark. It is a simple and efficient update engine.

## Features

 * MurmurHash3 fast file checking
 * Unknown file deletion with whitelist
 * External file source handling
 * Modern web interface
 * Plugin engine
 * Multiple profiles
 * Native client with multiple languages bindings
 
## Installing

First, download the latest release from [here](https://github.com/slark-update/lightslark-server/releases).

### VPS/Dedicated server

Unzip the release, and then just launch bin/lightslark-server

```bash
$ unzip lightslark-server-1.0.0.zip
$ cd lightslark-server-1.0.0
$ bin/lightslark-server

[22:50:58] [INFO ] [fr.litarvan.slark.light.server.Main] Creating Lightslark...
[22:50:59] [INFO ] [fr.litarvan.slark.light.server.Main] Done.

[22:50:59] [INFO ] [Lightslark] Starting Lightslark Server v1.0.0

...

[22:50:59] [INFO ] [Lightslark] ====> Done ! Lightslark Server started on 0.0.0.0/0.0.0.0:34456
```

### PAAS

You can launch Lightslark on a PAAS using its Dockerfile. Example, using Zeit now :

```bash
$ now
```

## Building

```bash
$ gradle distZip
```

Then the output is build/distributions/lightslark-server-1.0.0.zip

## Running

```bash
gradle npm_run_prod run
```

Then go to http://your-host:34456/

## Development run

To test Slark when developing, you need to run simultaneously :

```bash
$ cd frontend
$ npm run serve
```

```bash
$ gradle run -Pdebug=true
```