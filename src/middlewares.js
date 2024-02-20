export const localsMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        res.locals.loggedIn = true
        res.locals.loggedInUser = req.session.user
    }
    res.locals.siteName = "WETUBE"
    next()
}