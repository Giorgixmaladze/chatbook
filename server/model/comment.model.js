const mongoose = require("mongoose")


const commentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"Post"
    },
    text:{
        type:String,
        required:[true,"comment can not be empty"],
        minLength:10
    }
})




const Comment = mongoose.model("Comment",commentSchema)


module.exports = Comment