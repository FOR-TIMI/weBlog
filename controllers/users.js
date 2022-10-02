const {User} = require('../models');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
}


module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}


module.exports.register = async (req, res, next) => {

  try{
    const {username, password, email} = req.body
    await User.create({username, password, email})
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    const validPassword = user.checkPassword(req.body.password);

  }
  catch(err){
    req.flash('error', err.message);
    res.redirect('register')
  }
    
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.login = async (req, res) => {
   
   const user = await User.findOne({
        attribute:{
          exclude: 'email'
        },
        where: {
          username: req.body.username
        }
      })


    if(user){
          const validPassword = user.checkPassword(req.body.password);
        if(validPassword){
          req.flash('success', 'welcome back!');
          res.redirect('/posts')
        //   const redirectUrl = req.session.returnTo  || '/posts';
        //   res.redirect(redirectUrl);
        //   delete req.session.returnTo;
        //   return
        }
        req.flash('error', 'Invalid username or password')
        res.redirect('/login')
    }
    req.flash('error', 'Invalid username or password')
    res.redirect('/login');
}

module.exports.logout = (req, res,next) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/posts');
}
