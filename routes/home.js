var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');

router.get('/', homeController.Index);
router.get('/login', homeController.Login);
router.get('/register', homeController.Register);
router.get('/start', homeController.Start);
router.get('/error', homeController.Error);
router.get('/create', homeController.Create);
router.get('/read', homeController.Read);
router.get('/edit', homeController.Edit);

module.exports = router;