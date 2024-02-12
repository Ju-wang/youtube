import express from "express"
import { handleWatch, getEdit, postEdit, getUpload, postUpload, deleteVideo } from "../controllers/videoController"

export const videoRouter = express.Router()
// export const videoCommentRouter = express.Router()

videoRouter.get("/:id([0-9a-f]{24})/edit", getEdit)
videoRouter.post("/:id([0-9a-f]{24})/edit", postEdit)
videoRouter.get("/:id([0-9a-f]{24})", handleWatch)
videoRouter.get("/upload", getUpload)
videoRouter.post("/upload", postUpload)
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo)

// videoCommentRouter.get("/edit", handleEditComment)


