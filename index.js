const express = require('express');
const app     = express();
const routes  = require('./routes/client.js'); 
const adminroutes  = require('./routes/admin.js'); 

const sequelize = require('./utils/database')
const bodyparser = require('body-parser');

app.use(bodyparser.json());


app.use(routes);
app.use('/admin',adminroutes);





sequelize
.sync()
.then(result => console.log("success"))
.catch(err => console.log(err));

app.listen(3000,() => console.log("server is listening on port 3000"))

