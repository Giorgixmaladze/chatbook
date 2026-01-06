const { Post } = require("../model/posts.model")
const User = require("../model/users.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

// ყველა მომხმარებლის წამოღება
const getAllUsers = catchAsync(async (req, res) => {
    const { page = 1, limit = 10 } = req.query
    
    // Convert page and limit to numbers
    const pageNum = parseInt(page, 10)
    const limitNum = parseInt(limit, 10)
    const skip = (pageNum - 1) * limitNum

    // Get total count for pagination info
    const totalCount = await User.countDocuments()
    
    // Get paginated users
    const users = await User.find()
        .skip(skip)
        .limit(limitNum)

    const totalPages = Math.ceil(totalCount / limitNum)

    res.json({
        status: "success",
        data: {
            users,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalCount,
                limit: limitNum,
                hasNextPage: pageNum < totalPages,
                hasPrevPage: pageNum > 1
            }
        }
    })

})

// მხოლოდ ერთი მომხმარებლის წამოღება id ის საშუალებით
const getSingleUser = catchAsync(async (req, res) => {
    const { id } = req.params

    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    res.json(user)

})





const updateUserPassword = catchAsync( async (req,res,next) =>{
    const {email,password} = req.body
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new AppError("User not registered",404))
    }
    user.password = password
    await user.save()
    res.status(200).json({
        message:"password successfully updated",
    })
})
const updateUser = catchAsync(async (req, res) => {

    const updates = req.body

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updates }
    )
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    res.json(user)

})


// მომხმარებლის წაშლა
const deleteUser = catchAsync(async (req, res) => {
    const { id } = req.params

    const user = await User.findByIdAndDelete(id)
    if (!user) {
        return res.status(404).json({ message: "User Not found" })
    }
    res.json({ message: "user successfully deleted" })

})


module.exports = { getAllUsers, updateUser, deleteUser, getSingleUser,updateUserPassword }