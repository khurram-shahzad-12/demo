import mongoose from "mongoose";
import validator from "validator"
const kittySchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please enter your Name"],
        minLength: [5, "Name should be more then 5 chracters"],
        match:[/^[a-zA-Z0-9]+$/,"name should be alphanumeric value"]
    },
    email:{
        type:String,
        required:[true, "please enter your email address"],
        validate:{
            validator:validator.isEmail,
            message:"Please enter a valid email address",
        },
        unique:true,
    },
    phoneno: {
        type: String,
        required: [true, "Please enter Phone Number"],
        validate: {
            validator: function(v) {
                return /^\d{9}$/.test(v);
            },
            message: "Phone number must be exactly 9 digits and contain only numbers"
        }
    },
    note: {
        type: String,
        required: [true, "Please Enter Check Note"],
        minLength: [20, "Detail must be minimum 20 character"]
    },
    createdAt: {
        type: Date,
        Default: Date.now,
    }
});

const notedata = mongoose.model("note", kittySchema);
export default notedata;