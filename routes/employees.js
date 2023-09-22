import { Router } from "express"
import * as employeesCtrl from '../controllers/employees.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router=Router()

router.get('/',employeesCtrl.index)
router.get('/new',isLoggedIn,employeesCtrl.new)
router.post('/',isLoggedIn,employeesCtrl.create)

export{
  router
}