
const Login = require("../models/loginMoldes");

exports.loginControllrs = (req,res)=>{
	res.render('login');
};

exports.register = async function(req,res){   
	try{
		const login = new Login(req.body);
		await login.register();

		if(login.errors.length>0){
			req.flash("errors",login.errors);
			req.session.save(function(){
				return res.redirect('index');
			});
			return;
		}

		req.flash("succes","Seu usuário foi cadastrado com sucesso.");
		req.session.save(function(){
			return res.redirect('index');
		});

		
	
	}catch(e){
		res.render('404');
	}
};	

