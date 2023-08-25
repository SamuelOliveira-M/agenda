require('dotenv').config()

const express = require('express');
const app = express();
const mongoose  = require('mongoose');
mongoose.connect(process.env.conectString)
	.then(()=>{
		console.log('Conectei a base de dados')
		app.emit('finalizado')
	}) 
	.catch(e =>console.log(e));


const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const router = require('./router');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {gerarCsrfToken, checkCsrfError,middlewareGlobal} = require('./src/middilware/middelwares')

app.use(helmet());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'public')));


app.use(session({
	secret: 'som201309',
	store : MongoStore.create ( { 
		mongoUrl : process.env.conectString  
	}),
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7,
		httpOnly: true
	}
})); 
''
app.use(flash());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'src','views'))


app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(gerarCsrfToken);

app.use(router);

app.on('finalizado',()=>{
	app.listen(3000,()=>{
		console.log('Servidor Online. LInk - http://localhost:3000')
	})
});
	

