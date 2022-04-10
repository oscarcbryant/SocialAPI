const router = require('express').Router();



const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    removeThought,
    createReaction,
    removeReaction
  } = require('../../controllers/thoughtController.js');
  
  // /api/courses
  router.route('/').get(getThought);
  
  // /api/courses/:courseId
  router
    .route('/:thoughtId')
    .get(getSingleThought)
    .post(createThought)
    .put(updateThought)
    .delete(removeThought);

    router.route('/:thoughtId/reactions').post(createReaction).delete(removeReaction);
  
  module.exports = router;
  