import { path } from '../lib/deps.ts';

import { DocOptions } from "../lib/DocOptions.ts";
import { Settings } from "../lib/Settings.ts";

const version = '1.0.0';
const name = Settings.basename(import.meta.url, '.ts');

const doc = `
Manage MDaemon configuration.
Version ${version}

Usage:
  ${name} update --name=<file/section/property> --value=<value> [--debug]
  ${name} read --name=<file.section.property> [--debug]
  ${name} backup --backup-file=<filename> [--debug]
  ${name} restore --backup-file=<filename> [--debug]
  ${name} -h | --help
  ${name} --version

Options:
  -h --help            Show this screen.
  --version            Show version.
  --debug              Run in debug mode.

`;

class CommandOptions extends DocOptions {
    public get name(): string {
        return this.options['--name'];
    }
    public get value(): string {
        return this.options['--value'];
    }
    public get backupRestoreFileName(): string {
        return this.options['backup-file'];
    }
    public get update() {
        return this.options['update'];
    }
    public get read() {
        return this.options['read'];
    }
    public get backup() {
        return this.options['backup'];
    }
    public get restore() {
        return this.options['restore'];
    }

    constructor(doc: string) {
        super(doc);
    }
}

interface ExplicitKey {
    fileName?: string;
    isValid: boolean;
    propertyName?: string;
    sectionName?: string;
}

function expandKey(packedKeyName: string): ExplicitKey {
    const parts = packedKeyName.split('/');
    const isValid = parts.length === 3;
    if (isValid) {
        const [fileName, sectionName, propertyName] = parts;
        return { isValid, fileName, sectionName, propertyName, } as ExplicitKey;
    } else {
        return { isValid };
    }
}

function cmdUpdate(settings: Settings, options: CommandOptions) {
    const key = expandKey(options.name);
    if (key.isValid) {
        console.log(`Update [${key.sectionName}].${key.propertyName} in file ${key.fileName}`);
    } else {
        console.log(`Syntax error in key "${options.name}"!`);
    }
}
function cmdRead(settings: Settings, options: CommandOptions) {
    const key = expandKey(options.name);
    if (key.isValid) {
        console.log(`Read [${key.sectionName}].${key.propertyName} from file ${key.fileName}`);
    } else {
        console.log(`Syntax error in key "${options.name}"!`);
    }
}
function cmdBackup(settings: Settings, options: CommandOptions) {

}
function cmdRestore(settings: Settings, options: CommandOptions) {

}

try {
    const options = new CommandOptions(doc);
    const settings = new Settings();

    if (options.debug) {
        console.log('Mdaemon is in ' + settings.mdaemonPath);
        console.log(JSON.stringify(options, null, '\t'));
        console.log(JSON.stringify(settings, null, '\t'));
    }

    if (options.read) { cmdRead(settings, options); }
    else if (options.update) { cmdUpdate(settings, options); }
    else if (options.backup) { cmdBackup(settings, options); }
    else if (options.restore) { cmdRestore(settings, options); }
    else {
        console.log('ERROR: unknown command!');
    }

    console.log('Done.');
}
catch (e) {
    console.error(e.message);
}