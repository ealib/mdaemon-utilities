import { path } from './deps.ts';

interface MDaemonUtilitiesSchema {
    appPath: string;
    iniPath: string;
}

export class Settings {
    private _settings?: MDaemonUtilitiesSchema;

    public readonly home: string;
    public readonly fileName: string;

    public get appPath(): string {
        const defaultValue = 'C:\\MDaemon\\App';
        return this._settings ? (this._settings.appPath ?? defaultValue) : defaultValue;
    }
    public get iniPath(): string {
        const defaultValue = path.join(this.appPath, 'MDaemon.ini');
        return this._settings ? (this._settings.iniPath ?? defaultValue) : defaultValue;
    }
    public get mdaemonPath(): string {
        return path.resolve(path.join(this.appPath, '..'));
    }

    constructor(settingsJson?: string) {
        this.home = Deno.env.get((Deno.build.os === 'windows') ? 'USERPROFILE' : 'HOME') ?? '.';
        const defaultValue = path.join(this.home, 'mdaemon-utilities.json');
        this.fileName = settingsJson ?? defaultValue;
        const settings = Deno.readTextFileSync(this.fileName);
        this._settings = JSON.parse(settings);
    }

    public static basename(name: string, removeSuffix?: string): string {
        const tmp = path.basename(name);
        return removeSuffix ? tmp.substr(0, tmp.length - removeSuffix.length) : tmp;
    }

}