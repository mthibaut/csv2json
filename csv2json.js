#!/usr/bin/env node
//
// Written by Maarten Thibaut.
// Released under the GPL.
//
var 
	argv = require('optimist')
		.usage('Usage: $0 -f file [-v var]')
		.demand(['f'])
		.argv,
    	fs   = require('fs');

function parseCsvFile(fileName, callback_data, callback_close){
  var stream = fs.createReadStream(fileName)
  var iteration = 0, header = [], buffer = ""

  // You may need to change the pattern to suit your needs
  //var pattern = /(?:^|;)("(?:[^"]+)*"|[^;]*)/g
  var pattern = /;/g;

  stream.addListener('close', callback_close);
  stream.addListener('data', function(data){
    //console.log(data.toString());
    // Ensure we can handle \r\n as well as \n returns in files
    buffer+=data.toString().replace('\r\n','\n');
    var parts = buffer.split('\n')
    //console.log("parts: " + parts);
    
    parts.forEach(function(d, i){
      // Skip empty lines
      if(d.length) {
        //console.log("part nr " + i + ": " + d);
        if(iteration++ == 0 && i == 0){
          header = d.split(pattern)
        }else{
          callback_data(buildRecord(d))
        }
      }
    })
    buffer = parts[parts.length-1]
  })

  function buildRecord(str){
    //console.log(str);
    var record = {};
    str.split(pattern).forEach(function(value, index){
      if(header[index] != '')
        record[header[index].toLowerCase()] = value.replace(/"/g, '')
    })
    return record
  }
}

// Main program, implemented asynchronously
var line = 0;
var records = [];

parseCsvFile(argv.f,
		function(data) {
			// called when there is a row of data
			records[line++] = data;
		}, 
		function() {
			// called on close
			var varname = "", semicolon = "";
			if(argv.v) {
				varname = argv.v + " = ";
				semicolon = ";";
			}
			console.log(varname + JSON.stringify(records, null, 4) + semicolon);
		}
);
