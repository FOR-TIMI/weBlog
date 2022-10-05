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
    // new User
    await User.create({username, password, email})
    
     //User check
     const user = await User.findOne({
      attribute:{
        exclude: 'email'
      },
      where: {
        username: req.body.username
      }
    })
    
    //Password Check
    const validPassword = user && await user.checkPassword(req.body.password) 
    
    //Can't find that user
    if(!user || !validPassword){
      req.flash('error', 'Invalid username or password')
      res.redirect('/login');
      return;
    }
  
      //store session
      req.session.save( () => {
        // declare session variables
        req.session.loggedIn = true;
        req.session.user_id = user.id;
        req.session.username = user.username;
        //Login successful
        req.flash('success', `Hi there, ${user.username}!`);
        res.redirect('/posts')
        return
      });

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
   
       //User check
      const user = await User.findOne({
        attribute:{
          exclude: 'email'
        },
        where: {
          username: req.body.username
        }
      })
      
      //Password Check
      const validPassword = user && await user.checkPassword(req.body.password) 
      
      //Can't find that user
      if(!user || !validPassword){
        req.flash('error', 'Invalid username or password')
        res.redirect('/login');
        return;
      }
    
        //store session
        req.session.save( () => {
          // declare session variables
          req.session.loggedIn = true;
          req.session.user_id = user.id;
          req.session.username = user.username;
          //Login successful
          req.flash('success', `welcome back ${user.username}!`);
          const redirectUrl = req.session.returnTo || '/posts';
          delete req.session.returnTo;
          res.redirect(redirectUrl);
          return
        });

}

module.exports.logout = (req, res,next) => {
  req.session.destroy(() => {
    res.redirect('/login')
  });
}
