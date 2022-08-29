const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname)));


app.get('/', function (req, res) {

  res.sendFile(path.join(__dirname, 'index.html')).setHeader('Cross-Origin-Opener-Policy', 'same-origin').setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
});

app.listen(9000);