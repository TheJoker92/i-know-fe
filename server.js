
//Install express server
const express = require('express');
const path = require('path');

const { exec } = require('child_process');

const spawn = require("child_process").spawn;


// require("child_process").spawn('python', ['../i-know-be/main.py'], {
//     cwd: process.cwd(),
//     detached: true,
//     stdio: "inherit"
//   })


const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/i-know-fe'));
app.use(express.static(__dirname + '/src/assets/'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/i-know-fe/index.html'));
});



app.post('/sendCommand', ()=> {
    exec('echo hello',
    function(error, stdout, stderr){

        const pythonProcess = spawn('python3.9',["-u", "../i-know-be/main.py"]);
        pythonProcess.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        pythonProcess.stderr.on('data', (data) => {
            console.log(data.toString());
        });
                
        console.log("aaaa")
        if(error) {
            console.log("/sendCommand - ERROR ", error)
        }

        if(stdout) {
            console.log("/sendCommand - STDOUT ", stdout)
        }

        if (stderr) {
            console.log("/sendCommand - STDERR ", stderr)
        }
    })
})

// Start the app by listening on the default Heroku port
app.listen(3000);