import Errorhandler from "../utils/errorhandler.js";
import catchasyncerror from "../middleware/catchasyncerror.js";
import notedata from "../models/noteschema.js";

export const createUserDataController = catchasyncerror(async (req, res, next) => {
    const { name, email, phoneno, note } = req.body;

    if (!name || !email || !phoneno || !note) {
        return next(new Errorhandler("Please Enter All Fields", 400))
    };

    const user = await notedata.create({
        name, email, phoneno, note
    });
    if(!user){
        return next(new Errorhandler("network error",400 ))
    }
    res.status(201).json({
        success: true,
        user: user,
        message: "values added successfully"
    })
})



export const getAllDataController = catchasyncerror(async (req, res, next) => {
    const allUser = await notedata.find({});
    
    res.status(200).json({
        success: true,
        allUser: allUser
    })
})


export const getUserByIdController = catchasyncerror(async (req, res, next) => {
    const { id } = req.body;
    if (!id) {
        return next(new Errorhandler("missing id", 400))
    }
    const user = await notedata.findById(id);
    if(!user){
        return next(new Errorhandler("no user found", 400))
    }

    res.status(200).json({
        success: true,
        user: user,
    })
});


export const updateUserController = catchasyncerror(async (req, res, next) => {
    const { userId, name, email, phoneno, note } = req.body;
    if (!name || !email || !phoneno || !note) {
        return next(new Errorhandler("Please Enter All Fields", 400))
    };

    const updateUser = await notedata.findByIdAndUpdate(userId, { name, email, phoneno, note }, {
        new: true,
        runValidators: true,
    });
    if(!updateUser){
        return next(new Errorhandler("user not found", 400))
    };

    res.status(200).json({
        success: true,
        message: "Updated Successfully",
    })
})