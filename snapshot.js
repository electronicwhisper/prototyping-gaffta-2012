/*

This node.js script takes a "snapshot" of the last modified file it finds (below it in the file hierarchy).

For example, if you last modified `web/mypage.html`, it will copy this file to `web/mypage.1.html`.

If `web/mypage.1.html` already exists, it will copy the file as `web/mypage.2.html`, etc.

The idea is to save these snapshots as educational references, to understand how a file was put together step-by-step.

*/


var exec = require('child_process').exec;
var fs = require('fs');


function makeCopyName(file, i) {
  var lastDot = file.lastIndexOf(".");
  return file.substring(0, lastDot) + "." + i + file.substr(lastDot);
}

// find the latest modified file
var cmd = 'find . -type f -exec ls -1t "{}" +;'
exec(cmd, function (error, stdout, stderr) {
  var file = stdout.split("\n")[0];
  
  // figure out what to name the copy
  var i = 1;
  var copyName = makeCopyName(file, i);
  while (fs.existsSync(copyName)) {
    i += 1;
    copyName = makeCopyName(file, i);
  }
  
  // copy the file
  cmd = 'cp "'+ file +'" "'+ copyName +'"';
  exec(cmd, function (error, stdout, stderr) {
    console.log("Created " + copyName);
  });
});