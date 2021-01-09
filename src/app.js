const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const PORT = 8080;

nunjucks.configure('src/views/',{
    express: app
});

app.get('/', (req, res)=>{
    res.render("index.njk");
})

app.listen(PORT);
console.log('Listening on port ' + PORT);
