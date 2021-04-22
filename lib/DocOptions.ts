import docopt from "https://deno.land/x/docopt@v1.0.7/mod.ts";

export abstract class DocOptions {
    protected options: any;

    public get debug(): boolean {
        return this.booleanOption('--debug');
    }

    public get version(): boolean {
        return this.booleanOption('--version');
    }

    protected booleanOption(name: string): boolean {
        return this.options[name] ?? false;
    }

    constructor(doc: string) {
        this.options = docopt(doc);
    }
}