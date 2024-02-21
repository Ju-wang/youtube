import express from "express"
import { handleEdit, handleRemove, logout, handleSee, handleGithubLogin, handleGithubCallback } from "../controllers/userController"

const userRouter = express.Router()


userRouter.get("/edit", handleEdit)
userRouter.get("/remove", handleRemove)
userRouter.get("/logout", logout)
userRouter.get(":id(\\d+)", handleSee)
userRouter.get("/github/start", handleGithubLogin)
userRouter.post("/github/callback", handleGithubCallback)



export default userRouter