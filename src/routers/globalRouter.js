
import express from "express"
import {home, search} from "../controllers/videoController"
import {getJoin, postJoin, login} from "../controllers/userController"

const globalRouter = express.Router()

globalRouter.get("/", home)
globalRouter.get("/join", getJoin)
globalRouter.post("/join", postJoin)
globalRouter.get("/login", login)
globalRouter.get("/search", search)

export default globalRouter
