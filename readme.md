# MDaemon Utilities

Simple admin utilities to be run by [Deno](https://deno.land).

- `mdgrp` - Convert a *MDaemon mailing list* file to CSV.
- `mdsend` - Queue a new message in MDaemon's raw queue.

## `mdgrp` - Convert a *MDaemon mailing list* file to CSV.

[Mdaemon](https://en.wikipedia.org/wiki/MDaemon)
mailing lists are stored in `*.grp` files.

### Example

Assume MDaemon is installed in `C:\MDaemon`.

Run the script `mdgrp.ts` passing the `*.grp` file as argument:

    deno run --allow-read --allow-write mdgrp.ts \
        --from C:\MDaemon\App\example-list@example.com.grp
        --to example-list@example.com.csv

to generate `.\example-list@example.com.csv`:

| ADDRESS                     | DESCRIPTION        | NORMAL | RECEIVE ONLY | SEND ONLY |
|-----------------------------|--------------------|--------|--------------|-----------|
| john.smith@example.com      | John B. Smith      | x      |              |           |
| amelia.jones@example.com    | Amelia J. Jones    |        | x            |           |
| george.williams@example.com | George T. Williams |        |              | x         |
| olivia.taylor@example.com   | Olivia A. Taylor   | x      |              |           |
| emily.wright@example.com    | Emily J. Wright    | x      |              |           |


### Synopsys

```
Process MDaemon mailing list files (*.grp).
Version 1.1.0

Usage:
  mdgrp.ts convert --from=<source_grp> --to=<target_file> [--debug]
  mdgrp.ts backup --app-dir=<app_dir> --backup-dir=<backup_dir> [--overwrite] [--debug] 
  mdgrp.ts restore --backup-dir=<backup_dir> --app-dir=<app_dir> [--overwrite] [--debug]
  mdgrp.ts -h | --help
  mdgrp.ts --version

Options:
  -h --help                  Show this screen.
  --version                  Show version.
  -f --from=<source_grp>     Source *.grp file.
  -t --to=<target_file>      Target file (*.txt, or *.csv).
  --app-dir=<app_dir>        MDaemon "App" directory.
  --backup-dir=<backup_dir>  Backup directory.
  --overwrite                Overwrite output files.
  --debug                    Run in debug mode.
```

## `mdsend` - Queue a new message in MDaemon's raw queue.

### Synopsys

```
deno run --allow-write mdsend.ts --help                                                                      
Queue a new message in MDaemon's raw queue.
Version 1.0.0

Usage:
  mdsend.ts --subject <text> --from=<address> --to=<address> [--cc=<address>] [--bcc=<address>] [--debug]
  mdsend.ts -h | --help
  mdsend.ts --version

Options:
  -h --help            Show this screen.
  --version            Show version.
  -s --subject=<text>  Subject of the message.
  -f --from=<address>  Sender of the message.
  -t --to=<address>    Recipient(s).
  --cc=<address>       Cc(s).
  --bcc=<address>      Bcc(s)
  --debug              Run in debug mode.
```

## License

Copyright &copy; 2021 Emanuele Aliberti

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
