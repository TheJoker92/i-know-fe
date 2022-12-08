
//Install express server
const express = require('express');
const path = require('path');

const { exec } = require('child_process');

const spawn = require("child_process").spawn;
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
})

users = {}

io.on('connection', (socket) => {
    var address = socket.handshake.address;

    users[address] = socket

    console.log(Object.keys(users))
   
  });


// require("child_process").spawn('python', ['../i-know-be/main.py'], {
//     cwd: process.cwd(),
//     detached: true,
//     stdio: "inherit"
//   })



// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/i-know-fe'));
app.use(express.static(__dirname + '/src/assets/'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/i-know-fe/index.html'));
});

  
    
app.post('/sendCommand', (req,res)=> {
    console.log("AAA")
    exec('echo hello',
    function(error, stdout, stderr){

        var pythonProcess = spawn('python3',["-u", "../i-know-be/main.py"]);
        pythonProcess.stdout.on('data', (data) => {
            // var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 

            users['::1'].emit("sendCommand", JSON.parse(data.toString()))
                })
        

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
    });
})


// Start the app by listening on the default Heroku port
http.listen(3000, () => {
    console.log('listening on *:3000');
  });