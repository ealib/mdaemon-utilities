export class MdRawMessage {
    public from: string = '';
    public to: string[] = [];
    public cc?: string[];
    public bcc?: string[];
    public subject = '';
    public body: string[] = [];

    public addRecipient(...address: string[]) {
        this.to.push(...address);
    }

    public addCc(...address: string[]) {
        if (this.cc) {
            this.cc.push(...address);
        } else {
            this.cc = address;
        }
    }

    public addBcc(...address: string[]) {
        if (this.bcc) {
            this.bcc.push(...address);
        } else {
            this.bcc = address;
        }
    }

    public append(...lines: string[]) {
        this.body.push(...lines);
    }

    public toString() {
        const headers = [
            `from <${this.from}>`,
            `to <${this.to.join(',')}>`,
            `subject <${this.subject}>`,
        ];
        if (this.cc) {
            headers.push(`cc <${this.cc.join(',')}>`);
        }
        if (this.bcc) {
            headers.push(`bcc <${this.bcc.join(',')}>`);
        }
        return [...headers, '', ...this.body].join('\n');
    }

}