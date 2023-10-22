const router = require('express').Router();

const {
    getThought,
    getOneThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController')

router.route('/').get(getThought).post(createThought)

router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought)

router.route('/:thoughtId/reaction').post(addReaction)

router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction)


module.exports = router