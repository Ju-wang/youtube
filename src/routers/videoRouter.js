import express from "express"
import { handleWatch, getEdit, postEdit, getUpload, postUpload } from "../controllers/videoController"

export const videoRouter = express.Router()
// export const videoCommentRouter = express.Router()

videoRouter.get("/:id(\\d+)/edit", getEdit)
videoRouter.post("/:id(\\d+)/edit", postEdit)
videoRouter.get("/:id(\\d+)", handleWatch)
videoRouter.get("/upload", getUpload)
videoRouter.post("/upload", postUpload)

// videoCommentRouter.get("/edit", handleEditComment)


