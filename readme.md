# Convert a *MDaemon mailing list* file to CSV

[Mdaemon](https://en.wikipedia.org/wiki/MDaemon)
mailing lists are stored in `*.grp` files.

## Usage

Assume MDaemon is installed in `C:\MDaemon".

Run the script `mdgrp2csv.ts` passing the `*.grp` file as argument:

    deno run --allow-read --allow-write mdgrp2csv.ts C:\MDaemon\App\example-list@example.com.grp

to generate `C:\MDaemon\App\example-list@example.com.grp.csv`:

| ADDRESS                     | DESCRIPTION        | NORMAL | RECEIVE ONLY | SEND ONLY |
|-----------------------------|--------------------|--------|--------------|-----------|
| john.smith@example.com      | John B. Smith      | x      |              |           |
| amelia.jones@example.com    | Amelia J. Jones    |        | x            |           |
| george.williams@example.com | George T. Williams |        |              | x         |
| olivia.taylor@example.com   | Olivia A. Taylor   | x      |              |           |
| emily.wright@example.com    | Emily J. Wright    | x      |              |           |

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
