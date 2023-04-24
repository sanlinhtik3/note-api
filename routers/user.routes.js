const router = require('express').Router()
const { createUser, updateUser, deleteUser, getUsers, loginUser } = require('../controllers/user.controllers');
const { protect } = require('../middleware/authMiddleware');


router.route("/").get(protect, getUsers).post(createUser);
router.post('/login', loginUser)
router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router