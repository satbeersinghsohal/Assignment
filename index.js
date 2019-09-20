const express = require('express');
const app     = express();
const routes  = require('./routes/client.js'); 
const adminroutes  = require('./routes/admin.js'); 

const sequelize = require('./utils/database')
const bodyparser = require('body-parser');
const passport   = require('passport');
const session    = require('express-session')
const cookieParser = require('cookie-parser')
const alterTableIfNeeded = require('./utils/database_alter.js')


app.use(session({
	secret: "satbir",
}))

app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());


app.use(routes);
app.use('/admin',adminroutes);






sequelize
.sync()
.then(result => console.log("success"))
.catch(err => console.log(err));

app.listen(3000,() => console.log("server is listening on port 3000"))













