import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  res.render('index', { title: 'Employee Management Portal' })
})

export {
  router
}
