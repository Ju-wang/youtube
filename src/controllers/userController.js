import { json } from "express"
import User from "../modles/User"
import bcrypt from "bcrypt"

export const getJoin = (req, res) => {
    res.render("join", {
        pageTitle: "Join"
    })
}
// req.body에서 avatar를 못가져옴
export const postJoin = async (req, res) => {
    const { email, username, password, confirmPassword} = req.body
    const exists = await User.exists({$or: [{username}, {email}]})
    const avatarUrl = req.file.path
    if(exists) {
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: "This username/email is already exist"
        })
    }
    if(password == confirmPassword) {
        await User.create({
            avatarUrl,
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
    const savedUser = await User.findOne({email, socialOnly:false})
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
    console.log(savedUser);
    req.session.loggedIn = true
    req.session.user = savedUser.username
    req.session.email = savedUser.email
    req.session.userId = savedUser.id
    req.session.socialOnly = false
    req.session.avatarUrl = savedUser.avatarUrl
    return res.redirect("/")
}

export const handleGithubLogin = (req, res) => {
    const baseUrl = `https://github.com/login/oauth/authorize`
    const config = {
        client_id: process.env.GH_CLIENT_ID,
        scope: "read:user user:email"
    }
    const params = new URLSearchParams(config).toString()
    const finalUrl = `${baseUrl}?${params}`
    return res.redirect(finalUrl)
}

export const handleGithubCallback = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token"
    const config = {
        client_id: process.env.GH_CLIENT_ID,
        client_secret: process.env.GH_SECRET,
        code: req.query.code
    }
    const params = new URLSearchParams(config).toString()
    const finalUrl = `${baseUrl}?${params}`
    const response = await fetch(finalUrl, {
        method: "POST",
        headers: {
            Accept: "application/json"
        }
    }) 
    const data = await response.json()
    if("access_token" in data){
        const {access_token} = data
        const apiUrl = "https://api.github.com"
        const userData = await fetch(`${apiUrl}/user`, {
            method: "GET",
            headers:{
                Authorization: `Bearer ${access_token}`
            }   
        })
        const userDataJson = await userData.json()
        const emailData = await fetch(`${apiUrl}/user/emails`, {
            method: "GET",
            headers:{
                Authorization: `Bearer ${access_token}`
            }   
        })
        const emailDataJson = await emailData.json()
        const emailObj = emailDataJson.find((email) => email.primary == true && email.verified == true)
        if(!emailObj){
            return res.redirect("/login")
        }
        const existingUser = await User.findOne({email: emailObj.email})
        if(existingUser){
            req.session.loggedIn = true
            req.session.user = userDataJson.login
            req.session.email = emailObj.email
            req.session.socialOnly = true
            req.session.userId = existingUser.id
            return res.redirect("/")
        } else{
                await User.create({
                avatarUrl: userDataJson.avatar_url,
                email: emailObj.email,
                username: userDataJson.login,
                password: "",
                socialOnly: true
            })
            req.session.loggedIn = true
            req.session.user = userDataJson.login
            req.session.email = emailObj.email
            req.session.socialOnly = true
            return res.redirect("/")
        }
    }else {
        return res.redirect("/login")
    }
}

export const logout = (req, res) => {
    req.session.destroy()
    res.redirect("/")
}
export const getEdit = (req, res) => {
    res.render("edit-profile", {
        pageTitle: "Edit Profile"
    })
}
export const postEdit = async (req, res) => {
    const id = req.session.userId
    const avatarUrl = req.session.avatarUrl
    const file = req.file
    console.log(file);
    const {username, email} = req.body
    await User.findByIdAndUpdate(id, {
        avatarUrl: file ? file.path : avatarUrl,
        username,
        email
    })
    req.session.username = username
    req.session.email = email
    return res.redirect("/users/edit")
}

export const getChangePassword = (req, res) => {
    if(req.session.socialOnly){
        return res.redirect("/")
    }
    return res.render("change-password", {
        pageTitle:"Change Password"
    })
}

export const postChangePassword = async (req, res) => {
    const id = req.session.userId 
    const user = await User.findById(id)
    const {oldPassword, newPassword, newPasswordConfirmation} = req.body
    const ok = await bcrypt.compare(oldPassword, user.password)
    if(!ok){
        return res.status(400).render("change-password", {
            pageTitle:"Change Password", 
            errorMessage: "The password does not correct"
        })
    }
    if(newPassword !== newPasswordConfirmation){
        return res.status(400).render("change-password", {
            pageTitle:"Change Password", 
            errorMessage: "The password does not match the confirmation"
        })
    }
    user.password = newPassword
    await user.save()
    return res.redirect("/users/logout")
}

export const handleRemove = (req, res) => res.send("Remove User")
export const handleSee = (req, res) => res.send("See User")
