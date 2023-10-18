const checkAuth = async (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        req.logOut((err) => {
            return res.status(401).json({ authenticated: false })
        })
    }
}

export default checkAuth