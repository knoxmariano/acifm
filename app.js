
/**
 * Basic CRUD
 * API Auth is not included
 */

const express = require('express');
//const routes = require('./routes'); //For view
const http = require('http');
const path = require('path');
//load route
const surveys = require('./survey/surveys'); 
const login = require('./survey/login');
const index = require('./survey/index');
const customers = require('./routes/customers')
const app = express();
//const bodyParser = require('body-parser');

const connection  = require('express-myconnection'); 
const mysql = require('mysql');


// all REST environments
app.set('port', process.env.PORT || 4300);
//Use this view later
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.logger('dev'));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:false }))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    
    connection(mysql,{
        
        host: 'localhost', //'localhost or IP',
        user: 'root',
        password : '',
        //port : 3306, //port mysql
        database:'dbaudit'

        // host: 'localhost', //'localhost or IP',
        // user: 'root',
        // password : '',
        // //port : 3306, //port mysql
        // database:'dbaudit'

    },'pool') //or single

);

//samples
app.get('/', customers.list);
app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id',customers.save_edit);

//
app.get('/surveys/testCon', surveys.testCon);
app.get('/surveys/createTableStations', surveys.createTableStations);
app.get('/surveys/list', surveys.list);
app.put('/surveys/add', surveys.save);
app.delete('/surveys/delete/:id', surveys.delete_survey);
app.post('/surveys/edit/:id',surveys.save_edit);

//For login
app.get('/login/createTableUsers', login.createTableUsers);
app.get('/login/validate_user', login.validate_user);
app.put('/login/add_user', login.add_user);
app.get('/login/list', login.list);

http.createServer(app).listen(app.get('port'), ()=>{
  console.log('Express server listening on port ' + app.get('port'));
});
