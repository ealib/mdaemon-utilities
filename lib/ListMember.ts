export class ListMember {
    public address: string = '';
    public description: string = '';
    public receiveOnly: boolean = false;
    public sendOnly: boolean = false;

    public get normal() {
        return !this.receiveOnly && !this.sendOnly;
    }

    constructor(options?: Partial<ListMember>) {
        if (options) {
            Object.assign(this, options);
        }
        if (!this.description) {
            this.description = '';
        }
    }

    private toStr(flag: boolean) {
        return flag ? 'x' : '';
    }

    public static wrap(...values: string[]) {
        return values.map(s => `"${s}"`).join(',')
    }

    public toCsv() {
        return ListMember.wrap(
            this.address,
            this.description,
            this.toStr(this.normal),
            this.toStr(this.receiveOnly),
            this.toStr(this.sendOnly),
        );
    }
}
