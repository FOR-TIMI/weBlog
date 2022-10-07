
module.exports.isLoggedIn = (req,res,next) => {
    if(!req.session.loggedIn){
		req.flash('error', 'you must be signed in')
		res.redirect('/login');
		return;
	}
      next();
}




