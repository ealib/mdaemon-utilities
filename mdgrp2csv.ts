import { ListMember } from './lib/ListMember.ts';

if (Deno.args.length > 0) {
    Deno.args.forEach((arg, index) => {
        const csvName = `${arg}.csv`;
        console.log(`${index}) ${arg} --> ${csvName}`);
        const content = Deno.readTextFileSync(arg);
        const members: ListMember[] = content
            .split(`\r\n`)
            .filter((line: string) => {
                return (line.length > 0)
                    && !line.startsWith(';')
                    && !line.startsWith('#');
            })
            .map(line => {
                const m = line.match(/([\^\$]+)?([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)\ (.*)?/i);
                if (m) {
                    const receiveOnly = m[1] === '^';
                    const sendOnly = m[1] === '$';
                    const address = m[2];
                    const description = m[3];
                    return new ListMember({
                        address,
                        description,
                        receiveOnly,
                        sendOnly,
                    });
                } else {
                    return new ListMember();
                }
            });
        const csv = members.map((member: ListMember) => member.toCsv());
        csv.unshift(ListMember.wrap("ADDRESS","DESCRIPTION","NORMAL","RECEIVE ONLY","SEND ONLY"));
        const csvText = csv.join('\n');
        Deno.writeTextFileSync(csvName, csvText);
    });
}
