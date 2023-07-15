oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g tripapps-cli
$ tripapps-cli COMMAND
running command...
$ tripapps-cli (--version)
tripapps-cli/0.0.0 win32-x64 node-v18.16.1
$ tripapps-cli --help [COMMAND]
USAGE
  $ tripapps-cli COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g oclif-hello-world
$ oex COMMAND
running command...
$ oex (--version)
oclif-hello-world/0.0.0 darwin-x64 node-v16.13.1
$ oex --help [COMMAND]
USAGE
  $ oex COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`tripapps-cli hello PERSON`](#tripapps-cli-hello-person)
* [`tripapps-cli hello world`](#tripapps-cli-hello-world)
* [`tripapps-cli help [COMMANDS]`](#tripapps-cli-help-commands)
* [`tripapps-cli plugins`](#tripapps-cli-plugins)
* [`tripapps-cli plugins:install PLUGIN...`](#tripapps-cli-pluginsinstall-plugin)
* [`tripapps-cli plugins:inspect PLUGIN...`](#tripapps-cli-pluginsinspect-plugin)
* [`tripapps-cli plugins:install PLUGIN...`](#tripapps-cli-pluginsinstall-plugin-1)
* [`tripapps-cli plugins:link PLUGIN`](#tripapps-cli-pluginslink-plugin)
* [`tripapps-cli plugins:uninstall PLUGIN...`](#tripapps-cli-pluginsuninstall-plugin)
* [`tripapps-cli plugins:uninstall PLUGIN...`](#tripapps-cli-pluginsuninstall-plugin-1)
* [`tripapps-cli plugins:uninstall PLUGIN...`](#tripapps-cli-pluginsuninstall-plugin-2)
* [`tripapps-cli plugins update`](#tripapps-cli-plugins-update)

## `tripapps-cli hello PERSON`

Say hello

```
USAGE
  $ tripapps-cli hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/TripApps/hello-world/blob/v0.0.0/dist/commands/hello/index.ts)_

## `tripapps-cli hello world`

Say hello world

```
USAGE
  $ tripapps-cli hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ tripapps-cli hello world
  hello world! (./src/commands/hello/world.ts)
```

## `tripapps-cli help [COMMANDS]`

Display help for tripapps-cli.

```
USAGE
  $ tripapps-cli help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for tripapps-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.12/src/commands/help.ts)_

## `tripapps-cli plugins`

List installed plugins.

```
USAGE
  $ tripapps-cli plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ tripapps-cli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `tripapps-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ tripapps-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ tripapps-cli plugins add

EXAMPLES
  $ tripapps-cli plugins:install myplugin 

  $ tripapps-cli plugins:install https://github.com/someuser/someplugin

  $ tripapps-cli plugins:install someuser/someplugin
```

## `tripapps-cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ tripapps-cli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ tripapps-cli plugins:inspect myplugin
```

## `tripapps-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ tripapps-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ tripapps-cli plugins add

EXAMPLES
  $ tripapps-cli plugins:install myplugin 

  $ tripapps-cli plugins:install https://github.com/someuser/someplugin

  $ tripapps-cli plugins:install someuser/someplugin
```

## `tripapps-cli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ tripapps-cli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ tripapps-cli plugins:link myplugin
```

## `tripapps-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ tripapps-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tripapps-cli plugins unlink
  $ tripapps-cli plugins remove
```

## `tripapps-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ tripapps-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tripapps-cli plugins unlink
  $ tripapps-cli plugins remove
```

## `tripapps-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ tripapps-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tripapps-cli plugins unlink
  $ tripapps-cli plugins remove
```

## `tripapps-cli plugins update`

Update installed plugins.

```
USAGE
  $ tripapps-cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
* [`oex hello PERSON`](#oex-hello-person)
* [`oex hello world`](#oex-hello-world)
* [`oex help [COMMAND]`](#oex-help-command)
* [`oex plugins`](#oex-plugins)
* [`oex plugins:inspect PLUGIN...`](#oex-pluginsinspect-plugin)
* [`oex plugins:install PLUGIN...`](#oex-pluginsinstall-plugin)
* [`oex plugins:link PLUGIN`](#oex-pluginslink-plugin)
* [`oex plugins:uninstall PLUGIN...`](#oex-pluginsuninstall-plugin)
* [`oex plugins update`](#oex-plugins-update)

## `oex hello PERSON`

Say hello

```
USAGE
  $ oex hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/oclif/hello-world/blob/v0.0.0/dist/commands/hello/index.ts)_

## `oex hello world`

Say hello world

```
USAGE
  $ oex hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `oex help [COMMAND]`

Display help for oex.

```
USAGE
  $ oex help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for oex.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `oex plugins`

List installed plugins.

```
USAGE
  $ oex plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ oex plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `oex plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ oex plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ oex plugins:inspect myplugin
```

## `oex plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oex plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ oex plugins add

EXAMPLES
  $ oex plugins:install myplugin 

  $ oex plugins:install https://github.com/someuser/someplugin

  $ oex plugins:install someuser/someplugin
```

## `oex plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ oex plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ oex plugins:link myplugin
```

## `oex plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oex plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oex plugins unlink
  $ oex plugins remove
```

## `oex plugins update`

Update installed plugins.

```
USAGE
  $ oex plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
