const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/keys')
const Cookie = require('express-session')//npm i express-session


app.use(Cookie({secret: 'somesecretvalue',cookie : {maxAge : 80*1000}})) //setting of the cookie

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors());


mongoose.connect(config.mongoUrl,{useNewUrlParser : true})
.then(()=> console.log('mongodb connected'))
.catch((err)=>{console.log(err)})


//routers 
const userRouter = require('./router/users')
const cellPhoneRouter = require('./router/lines')


app.use('/users/',userRouter);
app.use('/cellPhone/',cellPhoneRouter);


let port = 5000;
app.listen(port, () =>{console.log(`server runing on port ${port}`)})


