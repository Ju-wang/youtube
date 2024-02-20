import User from "../modles/User"
import bcrypt from "bcrypt"

export const getJoin = (req, res) => {
    res.render("join", {
        pageTitle: "Join"
    })
}
export const postJoin = async (req, res) => {
    const { email, username, password, confirmPassword} = req.body
    const exists = await User.exists({$or: [{username}, {email}]})
    if(exists) {
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: "This username/email is already exist"
        })
    }
    if(password == confirmPassword) {
        await User.create({
            email,
            username,
            password
        })
        return res.redirect("/login")
    }else{
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: "Please confirm password"
        })
    }  
}
export const getLogin = (req, res) => res.render("login", {
    pageTitle: "Login"
})
export const postLogin = async (req, res) => {
    const { email, password} = req.body
    const savedUser = await User.findOne({email})
    if(!savedUser){
        return res.status(400).render("login", {
            pageTitle: "Login", 
            errorMessage:"Email dose not exist"
        })
    }
    const comparePassword = await bcrypt.compare(password, savedUser.password)
    if (!comparePassword) {
        return res.status(400).render("login", {
            pageTitle: "Login", 
            errorMessage:"Wrong Password"
        })
    } 
    req.session.loggedIn = true,
    req.session.user = savedUser.username
    return res.redirect("/")
}
export const logout = (req, res) => res.send("log out")
export const handleEdit = (req, res) => res.send("Edit User")
export const handleRemove = (req, res) => res.send("Remove User")
export const handleSee = (req, res) => res.send("See User")
