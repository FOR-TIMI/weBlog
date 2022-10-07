const router= require('express').Router();
const userController = require('../../controllers/user-controller')



router.route('/')
      .get(userController.findAllUsers)
      .post(userController.createUser)

router.route('/:id')
      .get(userController.findOneUser)
      .put(userController.updateUser)
      .delete(userController.delete)

router.post('/login',userController.login)

router.post('/logout', userController.logout)


module.exports = router;
      
