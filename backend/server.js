import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose.set("strictQuery",false);
main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect(process.env.MONGODB);
};

app.listen(process.env.PORt, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})