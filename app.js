const express = require('express');
const morgan = require('morgan'); //third party libary
const mongoose = require('mongoose');
const pollController = require('./pollControler');

const app = express();
// three mane work of express
//1. route hendle 
//2. work with moddle wade / route process
//3. work with template engine

app.set('view engine', 'ejs'); //template engine

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get('/create', pollController.createPollGetController);
app.post('/create', pollController.createPollPostController);

app.get('/polls/:id', pollController.viewPollGetController);
app.post('/polls/:id', pollController.viewPollPostController);
app.get('/polls', pollController.getAllpolls);

app.get('/', (req, res) => {
   res.render('home');
});

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
.then(() => {
    app.listen(5454, () => {
        console.log("application run on 5454");
    })
})
.catch(e => {
    console.log(e);
});
