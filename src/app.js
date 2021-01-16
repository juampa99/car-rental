const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const PORT = 8080;

const configureDI = require('./config/DI');
const carModule = require('./module/car/module');
const userModule = require('./module/user/module');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static('public'));

nunjucks.configure('src/module/',{
    express: app,
    autoescape: true
});

const container = configureDI(app);

carModule.init(app, container);
userModule.init(app, container);

const carController = container.get('CarController');
app.get('/',  (req, res) =>{
    res.redirect('/car');
});
app.use((req,res)=>{
    res.render('./views/fragments/error_not_found.njk', { route: '/'});
})

app.listen(PORT, () => console.log('Listening on port ' + PORT));
