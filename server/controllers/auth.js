const { signToken } = require("../helpers/token")
const redis = require("../config/redis")
const { google } = require('googleapis');

class AuthController {
  static async signIn(req, res) {
      const auth = new google.auth.OAuth2(process.env.CLIENT_ID.replace(/_/g, "-"), process.env.CLIENT_SECRET.replace(/_/g, "-"), "postmessage")
      try {
        const { tokens } =  await auth.getToken(req.body.code)
        const { access_token, id_token, refresh_token} = tokens

        const ticket = await auth.verifyIdToken({
          idToken: id_token,
          audience: process.env.CLIENT_ID.replace(/_/g, "-"),
        });
        const {email} = ticket.getPayload();
        const tokenServer = signToken({
          email,
          rt : refresh_token
        })
        await redis.set(email, access_token, "EX", 3600)
        res.json({
          access_token : tokenServer
        })


      } catch (e) {
        console.log(e)
        res.status(500).json({
          message: "Internal server error"
        })
      }
  }
  static verify(req, res, next){
    if(req.accessToken){
      res.json({
        message: "Auth sucess"
      })
    } else {
      res.status(401).json({
        message: "Invalid Token"
      })
    }
  }
}

module.exports = AuthController


