const User = require('../model/User')
const jwt = require('jsonwebtoken')

const handleLogout = async(req, res)=>{
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({refreshToken: refreshToken})
    if (!foundUser) {
        res.clearCookie('jwt',{httpOnly: true,sameSite: 'None',secure: true})
        return res.sendStatus(401)
    }
    // delete refresh token in database
    foundUser.refreshToken = ''
    const result = await foundUser.save()
    console.log(result)
    res.clearCookie('jwt',{httpOnly:true,sameSite: 'None',secure: true})
    res.sendStatus(204)
}
module.exports = {handleLogout}