
import { DocOptions } from "../lib/DocOptions.ts";
import { MdGrpFileParser } from '../lib/MdGrpFileParser.ts';
import { ListMember } from '../lib/ListMember.ts';

const version = `1.1.1`;

const doc = `
Process MDaemon mailing list files (*.grp).
Version ${version}

Usage:
  ${import.meta.url} convert --from=<source_grp> --to=<target_file> [--debug]
  ${import.meta.url} backup --app-dir=<app_dir> --backup-dir=<backup_dir> [--overwrite] [--debug]
  ${import.meta.url} restore --backup-dir=<backup_dir> --app-dir=<app_dir> [--overwrite] [--debug]
  ${import.meta.url} -h | --help
  ${import.meta.url} --version

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

function convert(options: CommandOptions) {
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

function backup(options: CommandOptions) {
    console.log(`Backing up from ${options.appDir} to ${options.backupDir}`);
    const parser = new MdGrpFileParser(options.appDir);
    parser.parse()
        .then((mdGrp) => {
            // TODO
            Deno.writeTextFileSync(options.backupDir, mdGrp.toString());
            console.log('Done.');
        });
    console.error('NOT IMPLEMENTED');
}

function restore(options: CommandOptions) {
    console.log(`Restoring backup to ${options.appDir} from ${options.backupDir}`);
    console.error('NOT IMPLEMENTED');
}



try {
    const options = new CommandOptions(doc);

    if (options.debug) {
        console.log(JSON.stringify(options, null, '\t'));
    }

    if (options.version) {
        console.log(version);
    } else {
        if (options.convert) { convert(options); }
        else if (options.backup) { backup(options); }
        else if (options.restore) { restore(options); }
        else { console.log('Unknown command. Use --help.'); }
    }
}
catch (e) {
    console.error(e.message);
}
