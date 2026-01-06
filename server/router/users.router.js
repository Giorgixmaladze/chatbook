const express = require("express")
const { getAllUsers, updateUser, deleteUser, getSingleUser, updateUserPassword } = require("../controllers/users.controller")
const { signUp, logIn, verifyEmail, autoLogin, logOut } = require("../controllers/auth.controller")
const { protect } = require("../middlewares/auth.middleware")

const userRouter = express.Router()

// ბილიკი რომელზეც პარამეტრების გადაცემა არ გვჭირდება და მხოლოდ მოქმედებს ყველა მომხმარებლის წამოსაღები ფუნქცია და ახალი მომხმარებლის დამატების ფუნქცია
userRouter
    .route("/")
    .get(getAllUsers)

userRouter.post("/register", signUp)

userRouter.post("/login", logIn)

// Get current authenticated user (for auto-login)
userRouter.get("/me", protect, autoLogin)

userRouter.post("/logout", logOut)
// userRouter
//     .route("/password")
//     .patch(updateUserPassword)


//     // ეს ის ბილიკია როცა გვჭირდება პარამეტრის გადაცემა იმისთვის რომ ამოვიცნოთ თუ რომელი მომხმარებელი უნდა წამოვიღოთ, რომელი წავშალოთ ან რომლის მონაცემები უნდა განვაახლოთ
// userRouter
//     .route("/:id")
//     .patch(updateUser)
//     .delete(deleteUser)
//     .get(getSingleUser)

userRouter.get("/register/verify/:code", verifyEmail)

module.exports = { userRouter }