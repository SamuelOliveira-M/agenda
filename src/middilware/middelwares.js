exports.middlewareGlobal = (req,res,next)=>{
	res.locals.errors  = req.flash('errors');
	res.locals.succes  = req.flash('succes');
	
	next();
}


exports.checkCsrfError = (err,req,res,next)=>{
	if(err){
		return res.render('404');
	}
}

exports.gerarCsrfToken = (req,res,next)=>{
	res.locals.csrfToken = req.csrfToken();
	next();
}
