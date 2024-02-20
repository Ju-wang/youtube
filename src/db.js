import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL)

const db = mongoose.connection

const handleOpen = () => console.log("DB Connected");

db.on("error", (error) => console.log(error))
db.once("open", handleOpen)