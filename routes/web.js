const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');

// Base route
router.get('/', (req, res) => {
    res.send('Welcome to the API Home Page!');
});

router.route('/users').get(userController.getUsers);
router.route('/users-create').post(userController.createUser);
router.route('/users-update/:id').post(userController.updateUser);
router.route('/users-delete/:id').get(userController.deleteUser);

module.exports = router;
