const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const events = require('./events');

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});
app.use('/events', events);

app.listen(port, () => console.log(`Listening on port ${port}`));