import express from "express"
import { handleWatch, handleEdit, hadnleComment, handleUpload, handleDelete } from "../controllers/videoController"

export const videoRouter = express.Router()
export const videoCommentRouter = express.Router()

videoRouter.get("/upload", handleUpload)
videoRouter.get("/comment", hadnleComment)
videoRouter.get("/:id(\\d+)", handleWatch)
videoRouter.get("/:id(\\d+)/edit", handleEdit)
videoRouter.get("/:id(\\d+)/delete", handleDelete)

// videoCommentRouter.get("/edit", handleEditComment)


