const User = require("../model/users.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken")

// შეიქმნა იმისთვის რომ შეამოწმოს მომხმარებლის როლი და მოხდეს შესაბამისი მოწმედება
const allowedTo = (...roles) =>{
    return (req,res,next) =>{
        console.log(req.user)
        // შევამოწმებთ როლს, არის თუ არა კონკრეტული როლი admin user moderator და შესაბამისად მოხდეს უფლებების მიცემა
        if(!roles.includes(req.user.role)){
            // თუ მასივში მყოფი როლებიდან არცერთი არ არის მომხმარებლის როლი მაშინ ვეუბნებთ მას რომ კონკრეტული მოქმედების გაკეთების უფლება არ აქვს
            return next(new AppError("You don't have permission to do this"),401)
        }
        // ხოლო სხვა შემთხვევაში გადავა პროგრამა შემდეგ middleware-ზე
        next()
    }
}



const protect = async(req,res,next)=>{
    try{
       const token = req.cookies.lt
    //    console.log(token)
    // lt-> login token
    // 1) თუ აუთენტიკაციის ტოკენი არ არის გამოგზავნილი ვაბრუნებთ ერორს
    if(!token){
        return next(new AppError("User is not logged in!",401))
    }

    // 2)თუ გამოგვიგზავნეს ტოკენი, მაშინ შევამოწმოთ მისი ვალიდურობა და შემდეგ დეკრიპტაცია

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    if(!decoded){
        return next(new AppError("token is invalid!",401))
    }

    const user = await User.findById(decoded.id)

    if(!user){
        return next(new AppError("user can not be found",401))
    }

    if(!user.isVerified){
        return next(new AppError("user is not verified",401))
    }
    req.user = user
    console.log(req.user)
    next() 
    }catch(error){
        console.error("Auth Middleware Error: ", error.message)

        if(error.name==="TokenExpiredError"){
            return next(new AppError("token is expired!"))
        }

        return next(error)
    }
    
}

module.exports = {protect,allowedTo}