const express = require('express');
const mysql = require('mysql');



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'monster88',
  database: 'barang'
});

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/', (req, res) => {
  res.render('top.ejs');
});
app.get('/index', (req, res) => {
  connection.query('select * from items',(error,results)=> {
    console.log(results);
    res.render('index.ejs',{items:results });
  })
});
app.get('/new',(req,res)=> {
  res.render('new.ejs');
})

app.post('/create',(req,res) =>{
  console.log(req.body.itemName);
  connection.query('insert into items(name) values(?)',
  [req.body.itemName],
  (error,result)=>{
    res.redirect('/index')
  })
})
app.listen(3000);