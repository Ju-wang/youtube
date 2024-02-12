import User from "../modles/User"

export const getJoin = (req, res) => {
    res.render("join", {
        pageTitle: "Join"
    })
}
export const postJoin = async (req, res) => {
    console.log(req.body);
    const { email, username, password} = req.body
    await User.create({
        email,
        username,
        password
    })
    return res.redirect("/login")
}
export const login = (req, res) => res.send("Login User")
export const logout = (req, res) => res.send("log out")
export const handleEdit = (req, res) => res.send("Edit User")
export const handleRemove = (req, res) => res.send("Remove User")
export const handleSee = (req, res) => res.send("See User")
