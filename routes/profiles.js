import { Router } from "express"
import { isLoggedIn } from "../middleware/middleware.js"
import * as profilesCtrl from "../controllers/profiles.js"

const router = Router()
router.get('/', isLoggedIn, profilesCtrl.index)

export {
  router
}