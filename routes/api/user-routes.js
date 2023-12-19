const router = require('express').Router();
// CRUD = Create Read Update Delete
// CRUD operations imported from the user controller file.
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// CRUD operations that can be done on the root api/users path
router.route('/')
    .get(getUsers)
    .post(createUser);
// CRUD operations that can be done on the root api/users/userId path
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// CRUD operations that can be done on the root api/users/userId/friends/:friendId path
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;