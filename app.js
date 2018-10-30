const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const swig =require('swig-templates');
const morgan = require('morgan');
const Nedb = require('nedb');
const {get, put, set} = require('./dbfunc');

const port = process.env.PORT || 3000;
const app = express();
const upload = multer({dest: __dirname + '/upload'});
const dbbooks = new Nedb({filename: 'booksfile'});
const dbcategories = new Nedb({filename: 'categoriesfile'});
dbbooks.loadDatabase();
dbcategories.loadDatabase();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(morgan('short'));

// index page
app.get('/', (req, res) => {
    res.render('index', {});
});

// read book
app.get('/books', async (req, res) => {
    let result = {message:'ng'};
    try {
        const resp = await get({query: {}, db: dbbooks});
        result.message = 'ok';
        result.data = resp;
    } catch (err) {
        console.log(err);
        result.err = err.message;
    }
    res.json(result);
});

// create book
app.post('/books', upload.fields([{name: 'file'}, {name: 'thumb'}]), async (req, res) => {
    let result = {message:'ng'};
    try {
        const file = req.files.file[0].filename;
        const thumb = req.files.thumb[0].filename;
        const doc = {thumb, file};
        const resp = await put({doc, db: dbbooks});
        result.message = 'ok';
        result.data = resp;
    } catch (err) {
        console.log(err);
        result.err = err.message;
    }
    res.json(result);
});

// read category
app.get('/categories', async (req, res) => {
    let result = {message: 'ng'};
    try {
        const db = dbcategories;
        const resp = await get({query: {}, db});
        result.message = 'ok';
        result.data = resp;
    } catch (err) {
        console.log(err);
        result.err = err.message;
    }
    res.json(result);
});

// create category
app.post('/categories', async (req, res) => {
    let result = {message: 'ng'};
    try {
        const db = dbcategories;
        const category = req.body.category;
        const query = {name: category};
        const exist = await get({query, db});
        if (exist.length > 0) {
            throw new Error('input category name is exist');
        }
        const doc = {name: category, books: []};
        const resp = await put({doc, db});
        result.message = 'ok';
        result.data = resp;
    } catch (err) {
        console.log(err);
        result.err = err.message;
    }
    res.json(result);
});

// update category
app.patch('/categories/:id', async (req, res) => {
    let result = {message: 'ng'};
    try {
        const db = dbcategories;
        const id = req.params.id;
        const book = req.body.book;
        const query = {_id: id};
        const tgt = await get({query, db});
        if (tgt.length === 0) {
            throw new Error('target doc not found');
        }
        const books = tgt[0].books;
        if (books.find((elm) => elm === book)) {
            throw new Error('input book is exist');
        }
        books.push(book);
        const doc = {books};
        const resp = await set({query, doc, db});
        result.message = 'ok';
        result.data = resp;
    } catch (err) {
        console.log(err);
        result.err = err.message;
    }
    res.json(result);
});

app.listen(port, () => {console.log('server start on ' + port);});