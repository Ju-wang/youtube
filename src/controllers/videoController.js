let videos = [
    {
        title:"hello",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 1,
        id:1
    },
    {
        title:"yo",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 100,
        id:2
    },
    {
        title:"whats up",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 100,
        id:3
    },
]

export const trending = (req, res) => {
    return res.render("home", {pageTitle: "Home", videos})
}
export const handleWatch = (req, res) => {
    const id = req.params.id
    const video = videos[id - 1]
    return res.render("watch", {
        pageTitle: `Watching: ${video.title}`,
        video
    })
}
export const getEdit = (req, res) => {
    const id = req.params.id
    const video = videos[id - 1]
    return res.render("edit", {
        pageTitle: `Editing: ${video.title}`,
        video
    })
}
export const postEdit = (req, res) => {
    const id = req.params.id
    const title = req.body.title
    videos[id - 1].title = title
    return res.redirect(`/videos/${id}`)
}

export const getUpload = (req,res) => {
    return res.render("upload", {
        pageTitle: "Upload Video"
    })
}

export const postUpload = (req, res) => {
    const newVideo = {
        title: req.body.title,
        rating: 0,
        comments: 0,
        createdAt: "1 minutes ago",
        views: 0,
        id: videos.length + 1
    }
    videos.push(newVideo)
    return res.redirect("/")
}
 