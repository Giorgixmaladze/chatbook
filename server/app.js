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
    origin: "https://chatbook-1.onrender.com",
    credentials: true
}))


app.use(express.static(path.join(__dirname, "dist")))

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}
app.use(cookieParser())
app.use("/post", postRouter)
app.use("/user", userRouter)
app.use("/comment", commentRouter)
app.use(globalErrorHandler)

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

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



