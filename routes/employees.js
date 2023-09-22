import { Router } from "express"
import * as employeesCtrl from '../controllers/employees.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router=Router()

router.get('/',employeesCtrl.index)
router.get('/',isLoggedIn,employeesCtrl.new)

export{
  router
}