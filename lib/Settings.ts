import { path } from './deps.ts';

interface MDaemonUtilitiesSchema {
    appPath: string;
    iniPath: string;
}

export class Settings {
    private _settings?: MDaemonUtilitiesSchema;

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
        const fileName = settingsJson ?? 'mdaemon-utilities.json';
        const settings = Deno.readTextFileSync(fileName);
        this._settings = JSON.parse(settings);
    }

    public static basename(name: string, removeSuffix?: string): string {
        const tmp = path.basename(name);
        return removeSuffix ? tmp.substr(0, tmp.length - removeSuffix.length) : tmp;
    }

}