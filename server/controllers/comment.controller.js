const Comment = require("../model/comment.model")
const { Post } = require("../model/posts.model")
const catchAsync = require("../utils/catchAsync")

const addComment = catchAsync(async (req, res, next) => {
    const { postId, text } = req.body
    const newComment = await Comment.create({
        postId,
        text
    })

    await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: newComment._id } }
    );

    res.json(newComment)
})


module.exports = addComment