import { Router } from "express"
import * as employeesCtrl from '../controllers/employees.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router=Router()

router.get('/',employeesCtrl.index)
router.get('/new',employeesCtrl.new)
router.get('/:employeeId',employeesCtrl.show)
router.post('/',isLoggedIn,employeesCtrl.create)
router.delete('/:employeeId',isLoggedIn,employeesCtrl.remove)
router.get('/:employeeId/edit',isLoggedIn,employeesCtrl.edit)
router.put('/:employeeId',isLoggedIn,employeesCtrl.update)

export{
  router
}