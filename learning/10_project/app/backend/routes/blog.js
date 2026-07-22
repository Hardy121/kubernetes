const express = require('express');
const { readAllBlog, readBlogById, createBlog, deleteBlog, upadateBlog } = require('../controller/blogController');
const upload = require('../utils/muter');
const { authMiddleware } = require('../middleware/authprization');
const { asyncHandler } = require('../utils/asyncHandle');
const router = express.Router();

router.get('/blog', asyncHandler(readAllBlog));
router.get('/blog/:id', readBlogById)

router.post('/blog', authMiddleware, upload, createBlog)

router.delete('/blog/:id', deleteBlog)

router.put('/blog/:id', upadateBlog)

module.exports = router
