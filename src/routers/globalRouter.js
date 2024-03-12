import multer from "multer"
import express from "express"
import {home, search} from "../controllers/videoController"
import {getJoin, postJoin, getLogin, postLogin} from "../controllers/userController"
import { publicOnlyMiddleware, avatarUpload } from "../middlewares"

const globalRouter = express.Router()

globalRouter.get("/", home)
globalRouter.get("/join",publicOnlyMiddleware, getJoin)
globalRouter.post("/join",publicOnlyMiddleware, avatarUpload.single("avatar"), postJoin)
globalRouter.get("/login",publicOnlyMiddleware, getLogin)
globalRouter.post("/login",publicOnlyMiddleware, postLogin)
globalRouter.get("/search", search)

export default globalRouter
