var express = require('express');
var router = express.Router();

let clients = [];
let events = [];

router.get('/', (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    res.write(`data: ${JSON.stringify(events)}\n\n`);

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

setInterval(() => {
    if(clients.length){
        console.log("Send event to " + clients.length + " clients");
        let event = {msg: 'hey ' + Date.now()};
        events.push(event);
        clients.forEach(c => c.res.write(`data: ${JSON.stringify(event)}\n\n`));
    }
}, 2000);

module.exports = router;