import { MdGrpFile } from './MdGrpFile.ts';
import { ListMember } from './ListMember.ts';

export class MdGrpFileParser {

    constructor(public readonly fileName: string) { }

    public async parse(): Promise<MdGrpFile> {
        const mdGrp = new MdGrpFile();
        const content = await Deno.readTextFile(this.fileName);
        content
            .split(`\r\n`)
            .filter((line: string) => {
                return (line.length > 0)
                    && !line.startsWith(';')
                    && !line.startsWith('#');
            })
            .forEach((line: string) => {
                const m = line.match(/([\^\$]+)?([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)\ (.*)?/i);
                if (m) {
                    const receiveOnly = m[1] === '^';
                    const sendOnly = m[1] === '$';
                    const address = m[2];
                    const description = m[3];
                    const member = new ListMember({
                        address,
                        description,
                        receiveOnly,
                        sendOnly,
                    });
                    mdGrp.add(member);
                }
            });
        return mdGrp;
    }
}