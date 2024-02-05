export const trending = (req, res) => res.render("home", {pageTitle: "Home"})
export const search = (req, res) => res.send("Search Video")
export const handleWatch = (req, res) => res.render("watch", {pageTitle: "Watch"})
export const handleEdit = (req, res) => res.render("edit", {pageTitle: "Edit"})
export const hadnleComment = (req, res) => res.send("Comment Video")
export const handleUpload = (req, res) => res.send("Upload Video")
export const handleDelete = (req, res) => res.send("Delete Video")

 