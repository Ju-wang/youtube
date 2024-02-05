import express from "express"
import { handleEdit, handleRemove, logout, handleSee } from "../controllers/userController"

const userRouter = express.Router()


userRouter.get("/edit", handleEdit)
userRouter.get("/remove", handleRemove)
userRouter.get("/logout", logout)
userRouter.get(":id(\\d+)", handleSee)




export default userRouter