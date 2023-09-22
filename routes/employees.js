import { Router } from "express"
import * as employeesCtrl from '../controllers/employees.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router=Router()

router.get('/',employeesCtrl.index)
router.get('/new',isLoggedIn,employeesCtrl.new)
router.get('/:employeeId',employeesCtrl.show)
router.post('/',isLoggedIn,employeesCtrl.create)
router.put('/:employeeId/edit',employeesCtrl.edit)

export{
  router
}