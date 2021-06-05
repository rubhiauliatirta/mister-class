const { verifyToken } = require("../helpers/token")
const redis = require("../config/redis")
const { google } = require('googleapis');

module.exports = {
  async authentication(req, res, next) {
    try {
      const { email, rt } = verifyToken(req.headers.access_token)
      const accessToken = await redis.get(email)

      if (accessToken) {
        req.accessToken = accessToken
      }

      req.email = email
      req.refreshToken = rt
      next()
    } catch (e) {
      console.log(e)
      res.status(401).json({
        message: "Authentication failed"
      })
    }
  },
  async refreshToken(req, res, next) {
    if (req.accessToken) {
      next()
    } else {
      try {
        const auth = new google.auth.OAuth2(process.env.CLIENT_ID.replace(/_/g, "-"), process.env.CLIENT_SECRET.replace(/_/g, "-"), "postmessage")
        const { tokens } = await auth.refreshTokenNoCache(req.refreshToken)

        req.accessToken = tokens.access_token
        await redis.set(req.email, tokens.access_token, "EX", 3600)
        next()


      } catch (e) {
        console.log(e)
        res.status(401).json({
          message: "Authentication failed -rt"
        })
      }
    }
  }
}