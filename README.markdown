csv2json
========

Parses a CSV file and dumps out a JSON version of it.

Use -f to specify the input file, and -v to specify a variable name that the
output will be assigned to.

Usage
=====
`Usage: node ./csv2json.js -f file [-v var]`

Examples
========
input.csv:
```csv
name;description
csv2json;Parses a CSV file
node;Very important!
```
***
`$ ./csv2json.js -f input.csv`
```json
[
    {
        "name": "csv2json",
        "description": "Parses a CSV file"
    },
    {
        "name": "node",
        "description": "Very important!"
    }
]
```
