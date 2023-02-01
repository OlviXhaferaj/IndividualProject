const authPage = (permissions) => {
    return (req, res, next) => {
        if(permissions.includes(req.user)){
            console.log(req.user,'This is the req .user')
            next()
        } else{
            return res.status(401).json("You dont have permission!")
        }
    }
}

module.exports = {authPage};