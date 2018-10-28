const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const swig =require('swig-templates');
const morgan = require('morgan');

const port = 3000;
const app = express();
const upload = multer({dest: __dirname + '/upload'});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(morgan('short'));

app.get('/', (req, res) => {
    res.render('index', {});
});

app.listen(port, () => {console.log('server start on ' + port);});