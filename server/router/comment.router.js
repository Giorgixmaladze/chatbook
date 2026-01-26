const express = require("express")
const addComment = require("../controllers/comment.controller")
const commentRouter = express.Router()


commentRouter
    .route("/")
    .post(addComment)


module.exports = commentRouter

