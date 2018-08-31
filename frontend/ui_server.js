const express = require('express');
const app = express()
const path = require('path');

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`UI server listening on ${PORT}`);
})
