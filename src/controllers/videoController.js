import Video from "../modles/Video"

export const home = async (req, res) => {
    const videos = await Video.find({})
    return res.render("home", {pageTitle: "Home", videos})
}
export const handleWatch = async (req, res) => {
    const id = req.params.id
    const video = await Video.findById(id).exec()
    if(video){
        return res.render("watch", {pageTitle:video.title, video})
    }else{
        return res.render("404", {pageTitle:"Nothing Found."})
    }
}
export const getEdit = async (req, res) => {
    const id = req.params.id
    const video = await Video.findById(id).exec()
    if(video){
        return res.render("edit", {
            pageTitle: `Editing ${video.title}`,
            video
        })
    }else{
        return res.render("404", {pageTitle:"Nothing Found."})
    }
}
export const postEdit = async (req, res) => {
    const id = req.params.id
    const { title, description, hashtags}  = req.body
    const video = await Video.findById(id).exec()
    if(video){
        await Video.findByIdAndUpdate(id, {
            title,
            description,
            hashtags
        })
        return res.redirect(`/videos/${id}`)
    } else{
        return res.render("404")
    }  
}

export const getUpload = (req,res) => {
    return res.render("upload", {
        pageTitle: "Upload Video"
    })
}

export const postUpload = async (req, res) => {
    const {title, description, hashtags} = req.body
    try{
        await Video.create({
            title,
            description,
            hashtags: hashtags.split(",").map((word) => `#${word}`),
        })
        return res.redirect("/")
    } catch(error){
        console.log(error);
        return res.render("upload", {
            pageTitle: "Upload Video"
        })
    }
        
}
 