const file_system = require('fs');
const archiver = require('archiver');
const express = require("express")

const app = express()

app.use(express.static(__dirname))

var output = file_system.createWriteStream('target.zip');
var archive = archiver('zip');

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);

const source_dir = "./storage"

// append files from a sub-directory and naming it `new-subdir` within the archive (see docs for more options):
archive.directory(source_dir, false);
archive.finalize();

app.get("/download",(req,res)=>{
    res.redirect("/target.zip")
})

app.listen(3000,()=>{
    console.log("Server is running!")
})