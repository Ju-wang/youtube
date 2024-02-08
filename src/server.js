import express from "express"
import morgan from "morgan"
import globalRouter from "./routers/globalRouter"
import userRouter from "./routers/userRouter"
import {videoRouter} from "./routers/videoRouter"
// import {videoCommentRouter} from "./routers/videoRouter"

const app = express()
const logger = morgan("dev")

app.set("view engine", "pug")
app.set("views", process.cwd() + "/src/views")
app.set("x-powered-by", false)
app.use(logger)
app.use(express.urlencoded({ extended: true }))
app.use("/", globalRouter)
app.use("/users", userRouter)
app.use("/videos", videoRouter)
// app.use("/videos/comment", videoCommentRouter)

export default app
