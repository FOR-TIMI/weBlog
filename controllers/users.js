const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
}


module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}


module.exports.register = async (req, res, next) => {

    const {username, password, email} = req.body
    await User.create({username, password, email})
    console.log("created new user",{username, password, email})
    
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
//     req.flash('success', 'welcome back!');
//     const redirectUrl = req.session.returnTo || '/campgrounds';
//     delete req.session.returnTo;
//     res.redirect(redirectUrl);
}

module.exports.logout = (req, res,next) => {
    // req.logout();
    // req.flash('success', "Goodbye!");
    // res.redirect('/campgrounds');

}
