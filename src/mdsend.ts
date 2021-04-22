import { path } from '../lib/deps.ts';

import { DocOptions } from "../lib/DocOptions.ts";
import { MdRawMessage } from '../lib/MdRawMessage.ts';
import { Settings } from "../lib/Settings.ts";

const version = '1.1.0';
const name = Settings.basename(import.meta.url, '.ts');

const doc = `
Queue a new message in MDaemon's raw queue.
Version ${version}

Usage:
  ${name} --subject=<text> --from=<address> --to=<address> [--cc=<address>] [--bcc=<address>] [--debug]
  ${name} -h | --help
  ${name} --version

Options:
  -h --help            Show this screen.
  --version            Show version.
  -s --subject=<text>  Subject of the message.
  -f --from=<address>  Sender of the message.
  -t --to=<address>    Recipient(s).
  --cc=<address>       Cc(s).
  --bcc=<address>      Bcc(s)
  --debug              Run in debug mode.

`;

async function prompt(message: string = '') {
    const buf = new Uint8Array(1024);
    await Deno.stdout.write(new TextEncoder().encode(message + ": "));
    const n = <number>await Deno.stdin.read(buf);
    return new TextDecoder().decode(buf.subarray(0, n)).trim();
}

function debugPrint(title: string, message: string) {
    console.log(`<${title}>`);
    console.log(message);
    console.log(`</${title}>`);
}

class CommandOptions extends DocOptions {
    public get from(): string {
        return this.options['--from'];
    }
    public get to(): string {
        return this.options['--to'];
    }
    public get subject(): string {
        return this.options['--subject'];
    }
    public get cc() {
        return this.options['--cc'];
    }
    public get bcc() {
        return this.options['--bcc'];
    }

    constructor(doc: string) {
        super(doc);
    }
}

class MessageSender {
    private rawMessage: MdRawMessage | undefined;

    constructor(
        private settings: Settings,
        private options: CommandOptions
    ) {
        if (options.debug) {
            debugPrint('SETTINGS', JSON.stringify(settings, null, '\n'));
            debugPrint('OPTIONS', JSON.stringify(options, null, '\t'));
        }
    }

    public async go(): Promise<boolean> {
        if (this.options.version) {
            console.log(version);
            return false;
        }

        this.rawMessage = new MdRawMessage();

        if (this.rawMessage) {
            this.rawMessage.from = this.options.from;
            this.rawMessage.addRecipient(...this.options.to.split(','));
            this.rawMessage.subject = this.options.subject;
            if (this.options.cc) {
                this.rawMessage.addCc(...this.options.cc.split(','));
            }
            if (this.options.bcc) {
                this.rawMessage.addBcc(...this.options.bcc.split(','));
            }

            const lines = await this.readMessage();

            if (this.options.debug) {
                console.debug(`${lines.length} body lines`);
            }

            if (await this.askConfirmation()) {
                this.rawMessage.append(...lines);
                if (this.options.debug) {
                    debugPrint('RAW MESSAGE', this.rawMessage.toString());
                }
                await this.spool();
                return true;
            } else {
                console.log('Message discarded.');
                return false;
            }

        } else {
            throw new Error('Internal error (go)');
        }
    }


    private async askConfirmation(): Promise<boolean> {
        const answer = await prompt('Send? (Y/n)');
        return ['', 'y', 'Y'].includes(answer);
    }

    private async readMessage(): Promise<string[]> {
        const lines = [];
        if (this.rawMessage) {
            let line: string | undefined;

            console.log('Enter message. End with a .');

            do {
                if (line) { lines.push(line); }
                line = await prompt();
            } while (line !== '.');

            return lines;
        }
        throw new Error('Internal error (readMessage)');
    }

    private async spool() {
        if (this.rawMessage) {
            const fileName = `md${Math.trunc(Math.random() * 100000)}.raw`;
            // FIXME: read Settings.iniPath: [Directories] Raw
            const fullName = path.join(this.settings.mdaemonPath, 'Queues', 'Raw', fileName);
            if (this.options.debug) {
                debugPrint('RAW MESSAGE FILE', fullName);
            }
            return Deno.writeTextFile(fullName, this.rawMessage.toString());
        }
        throw new Error('Internal error (spool)');
    }

}

try {
    const options = new CommandOptions(doc);
    const settings = new Settings();
    if (options.debug) {
        console.log('Mdaemon is in ' + settings.mdaemonPath);
    }
    const messageSender = new MessageSender(settings, options);
    messageSender.go()
        .then((sent) => {
            if (sent) {
                console.log('Sent.');
            }
        })
        .catch((err) => console.error(err));
}
catch (e) {
    console.error(e.message);
}