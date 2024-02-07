import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/youtube")

const db = mongoose.connection

const handleOpen = () => console.log("DB Connected");

db.on("error", (error) => console.log(error))
db.once("open", handleOpen)