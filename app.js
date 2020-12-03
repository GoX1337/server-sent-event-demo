const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});
app.get('/favicon.ico', (req, res) => {
    res.send();
});

let clients = [];

app.get('/events', (req, res) => {

    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);

    res.write(`data: ${JSON.stringify({msg: 'kek'})}\n\n`);

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res
    };
    console.log(`${clientId} Connection connected`);
    clients.push(newClient);

    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(c => c.id !== clientId);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

setInterval(() => {
    if(clients.length > 0){
        console.log("Send event to " + clients.length + " clients");
        clients.forEach(c => c.res.write(`data: ${JSON.stringify({msg: 'hey ' + Date.now()})}\n\n`));
    }
}, 2000);