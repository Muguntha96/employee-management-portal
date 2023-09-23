import { Router } from "express"
import * as employeesCtrl from '../controllers/employees.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router=Router()

router.get('/',employeesCtrl.index)
router.get('/new',isLoggedIn,employeesCtrl.new)
router.get('/:employeeId',employeesCtrl.show)
router.post('/',isLoggedIn,employeesCtrl.create)
router.get('/:employeeId/edit',employeesCtrl.edit)
router.put('/:employeeId',employeesCtrl.update)

export{
  router
}