const express = require("express")
const { Post } = require("../model/posts.model")
const { getAllPosts, getSinglePost, deletePost, createPost, updatePost, getPostsByUserId } = require("../controllers/posts.controller")
const { protect, allowedTo } = require("../middlewares/auth.middleware")


const postRouter = express.Router()

// ბილიკი რომელზეც პარამეტრების გადაცემა არ გვჭირდება და მხოლოდ მოქმედებს ყველა პოსტის წამოსაღები ფუნქცია და ახალი პოსტის დამატების ფუნქცია
postRouter.get("/", protect, allowedTo("admin"), getAllPosts)
postRouter.get("/:userId", protect, getPostsByUserId)
postRouter.post("/", protect, createPost)


// ეს ის ბილიკია როცა გვჭირდება პარამეტრის გადაცემა იმისთვის რომ ამოვიცნოთ თუ რომელი პოსტი უნდა წამოვიღოთ ან რომელი წავშალოთ
postRouter.patch("/:id", protect, updatePost)


postRouter.delete("/:id", protect, deletePost)
module.exports = postRouter