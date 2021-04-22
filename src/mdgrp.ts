import { path } from '../lib/deps.ts';

import { DocOptions } from "../lib/DocOptions.ts";
import { Settings } from "../lib/Settings.ts";
import { MdGrpFileParser } from '../lib/MdGrpFileParser.ts';
import { ListMember } from '../lib/ListMember.ts';

const version = `1.2.0`;
const name = Settings.basename(import.meta.url, '.ts');

const doc = `
Process MDaemon mailing list files (*.grp).
Version ${version}

Usage:
  ${name} convert --from=<source_grp> --to=<target_file> [--debug]
  ${name} backup --app-dir=<app_dir> --backup-dir=<backup_dir> [--overwrite] [--debug]
  ${name} restore --backup-dir=<backup_dir> --app-dir=<app_dir> [--overwrite] [--debug]
  ${name} -h | --help
  ${name} --version

Options:
  -h --help                  Show this screen.
  --version                  Show version.
  -f --from=<source_grp>     Source *.grp file.
  -t --to=<target_file>      Target file (*.txt, or *.csv).
  --app-dir=<app_dir>        MDaemon "App" directory.
  --backup-dir=<backup_dir>  Backup directory.
  --overwrite                Overwrite output files.
  --debug                    Run in debug mode.

`;

class CommandOptions extends DocOptions {
    public get convert(): boolean {
        return this.booleanOption('convert');
    }
    public get backup(): boolean {
        return this.booleanOption('backup');
    }
    public get restore(): boolean {
        return this.booleanOption('restore');
    }

    public get from(): string {
        return this.options['--from'];
    }
    public get to(): string {
        return this.options['--to'];
    }
    public get appDir(): string {
        return this.options['--app-dir'];
    }
    public get backupDir() {
        return this.options['--backup-dir'];
    }
    public get overwrite() {
        return this.options['--overwrite'];
    }

    constructor(doc: string) {
        super(doc);
    }
}

function convert(settings: Settings, options: CommandOptions) {
    console.log(`Converting ${options.from} to ${options.to}:`);
    const csvName = options.to;
    const parser = new MdGrpFileParser(options.from);
    parser.parse()
        .then((mdGrp) => {
            const csv = mdGrp.members.map((member: ListMember) => member.toCsv());
            csv.unshift(ListMember.wrap("ADDRESS", "DESCRIPTION", "NORMAL", "RECEIVE ONLY", "SEND ONLY"));
            const csvText = csv.join('\n');
            Deno.writeTextFileSync(csvName, csvText);
            console.log('Done.');
        })
        .catch((err) => console.error(err));
}

function backup(settings: Settings, options: CommandOptions) {
    console.log(`Backing up from ${options.appDir} to ${options.backupDir}`);
    const grps: string[] = [];

    for (const dirEntry of Deno.readDirSync(options.appDir)) {
        if (dirEntry.isFile && dirEntry.name.endsWith('.grp')) {
            grps.push(dirEntry.name);
        }
    }

    grps.forEach((grpName) => {
        const grpFullName = path.join(options.appDir, grpName);
        const parser = new MdGrpFileParser(grpFullName);
        parser.parse()
            .then((mdGrp) => {
                Deno.writeTextFileSync(options.backupDir, mdGrp.toString());
            });
    });
}

function restore(settings: Settings, options: CommandOptions) {
    console.log(`Restoring backup to ${options.appDir} from ${options.backupDir}`);
    console.error('NOT IMPLEMENTED');
}



try {
    const options = new CommandOptions(doc);
    const settings = new Settings();
    if (options.debug) {
        console.log('Mdaemon is in ' + settings.mdaemonPath);
    }

    if (options.debug) {
        console.log(JSON.stringify(options, null, '\t'));
    }

    if (options.version) {
        console.log(version);
    } else {
        if (options.convert) { convert(settings, options); }
        else if (options.backup) { backup(settings, options); }
        else if (options.restore) { restore(settings, options); }
        else { console.log('Unknown command. Use --help.'); }
    }
}
catch (e) {
    console.error(e.message);
}
