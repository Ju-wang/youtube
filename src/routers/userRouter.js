import express from "express"
import { getEdit, handleRemove, logout, handleSee, handleGithubLogin, handleGithubCallback, postEdit, getChangePassword, postChangePassword } from "../controllers/userController"
import { protectorMiddleware, publicOnlyMiddleware, uploadFiles } from "../middlewares"

const userRouter = express.Router()


userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadFiles.single("avatar"),postEdit)
userRouter.get("/remove", handleRemove)
userRouter.get("/logout",protectorMiddleware, logout)
userRouter.get(":id(\\d+)", handleSee)
userRouter.get("/github/start",publicOnlyMiddleware, handleGithubLogin)
userRouter.get("/github/callback",publicOnlyMiddleware, handleGithubCallback)
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword)



export default userRouter