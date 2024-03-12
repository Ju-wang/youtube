import express from "express"
import { handleWatch, getEdit, postEdit, getUpload, postUpload, deleteVideo } from "../controllers/videoController"
import { protectorMiddleware, videoUpload } from "../middlewares"

export const videoRouter = express.Router()
// export const videoCommentRouter = express.Router()

videoRouter.get("/:id([0-9a-f]{24})/edit",protectorMiddleware, getEdit)
videoRouter.post("/:id([0-9a-f]{24})/edit",protectorMiddleware, postEdit)
videoRouter.get("/:id([0-9a-f]{24})", handleWatch)
videoRouter.get("/upload",protectorMiddleware, getUpload)
videoRouter.post("/upload",protectorMiddleware,videoUpload.single("video"), postUpload)
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo)

// videoCommentRouter.get("/edit", handleEditComment)


