const express = require("express")

const morgan = require("morgan")

const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const postRouter = require("./router/posts.router")
const { userRouter } = require("./router/users.router")
const globalErrorHandler = require("./controllers/error.controller")
const commentRouter = require("./router/comment.router")
const cors = require("cors")
const path = require("path")
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))


app.use(express.static(path.join(__dirname, "dist")))

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}
app.use(cookieParser())
app.use("/posts", postRouter)
app.use("/users", userRouter)
app.use("/comments", commentRouter)
app.use(globalErrorHandler)

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connected to MongoDB")

        app.listen(process.env.PORT, () => {
            console.log("Server is running")
        })

    }).catch(err => {
        console.error(err)
        process.exit(1)
    })



