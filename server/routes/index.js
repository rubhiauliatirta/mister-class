const router = require("express").Router()
const AuthController = require("../controllers/auth")
const ClassroomController = require("../controllers/classroom")
const { authentication, refreshToken } = require("../middlewares/authentication")

router.post("/login", AuthController.signIn)
router.get("/verify", authentication, refreshToken, AuthController.verify)
router.get("/courses", authentication, refreshToken, ClassroomController.getCourses)
router.get("/classworks/:courseId", authentication, refreshToken, ClassroomController.getCourseData)
router.post("/classworks/:courseId", authentication, refreshToken, ClassroomController.createClassworks)
router.post("/topics/:courseId", authentication, refreshToken, ClassroomController.createTopics)

module.exports = router