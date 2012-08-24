csv2json
========

Parses a CSV file and dumps out a JSON version of it.

Use -f to specify the input file, and -v to specify a variable name that the
output will be assigned to.

examples
========

input.csv:

````name;description
csv2json;Parses a CSV file
node;Very important!
````

***

    $ ./csv2json.js -f input.js
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
