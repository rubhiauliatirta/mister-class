if(process.env.NODE_ENV === "development"){
  require("dotenv").config()
}
const express = require("express")
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", function(req, res){
  res.send("server is running")
})

app.use(require("./routes"))

app.listen(PORT, function(){
  console.log("server running on port" + PORT)
})
