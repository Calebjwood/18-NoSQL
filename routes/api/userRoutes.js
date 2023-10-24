const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,

} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser)

router.route('/:usersId').get(getSingleUser).put(updateUser).delete(deleteUser)

module.exports = router