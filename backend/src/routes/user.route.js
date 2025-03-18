import express from "express"
import { registerUser ,loginUser, logoutUser, getOtherUsers

} from "../controllers/usercontroller.js"
const router=express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/getOtherUsers").post(getOtherUsers)

export default router;