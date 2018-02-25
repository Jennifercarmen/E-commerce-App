const express = require('express');
const app = express();
//const server = app.listen(3000, listening);

const port = process.env.PORT || 2009;

app.listen(port, () => {
    console.log('Server running on port ' + port + '!');
});

app.use(express.static('public'));