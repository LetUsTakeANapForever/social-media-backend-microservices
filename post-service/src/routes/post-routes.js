const express = require('express');
const { createPost, deletePost, getAllPosts, getPost } = require('../controllers/post-controller');
const { authenticateRequest } = require('../middleware/authMiddleware');

const router = express();

router.use(authenticateRequest); // This middleware applies to every path here

// router.post('/post', authenticateRequest, createPost); // This middleware applies to only this path here

router.post('/create-post', createPost);
router.get('/get-posts', getAllPosts);
router.get('/:id', getPost);
router.delete('/:id', deletePost);

module.exports = router;