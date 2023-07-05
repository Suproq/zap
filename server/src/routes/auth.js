const {Router} = require('express');
const { regUser, loginUser } = require('../controllers/auth');

const router = Router();

router.post('/register', regUser);
router.post('/login', loginUser);

module.exports = router;