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
  
  // /api/thoughts
  router.route('/').get(getThought).post(createThought);
  
  // /api/thoughts/:thoughtId
  router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(removeThought);

    router.route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(removeReaction);
  
  module.exports = router;
  