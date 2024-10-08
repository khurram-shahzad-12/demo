import express from "express";
import cors from "cors";
import Errormiddleware from "./middleware/error.js";
import notes from "./route/noteroute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use("/api", notes);

app.use(Errormiddleware)
export default app;