const express = require('express')
const app = express();
const port = 3000;
require('dotenv').config()

app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/dashboard' , (req , res)=>{
    res.send("hello world");
})

app.listen(process.env.PORT, () => {
    console.log('port is listenting on 3000');
})