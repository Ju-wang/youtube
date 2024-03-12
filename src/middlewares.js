import multer from "multer"
// pug에서 locals 변수를 사용하기 위한 middlewares.
// userController가 먼저 작동되고, 다음으로 middleware가 작동한다.

export const localsMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        res.locals.loggedIn = Boolean(req.session.loggedIn)
        res.locals.loggedInUser = req.session.user
        res.locals.email = req.session.email
        res.locals.avatarUrl = req.session.avatarUrl
    }
    console.log(res.locals);
    if(req.session.socialOnly){
        res.locals.socialOnly = Boolean(req.session.socialOnly)
    }
    res.locals.siteName = "WETUBE"
    next()
}

export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        return next()
    } else{
        return res.redirect("/login")
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        return next()
    } else{
        return res.redirect("/")
    }
}

export const avatarUpload = multer({ dest: 'uploads/avatars/', limits: {
    fileSize: 3000000
} })
export const videoUpload = multer( {dest: 'uploads/videos/', limits: {
    fileSize: 10000000
}})