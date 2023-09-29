import { populate } from "dotenv"
import { Employee } from "../models/employee.js"
import { Review } from "../models/review.js"

function index(req, res) {
  Employee.find({})
    .then(employees => {
      res.render('employees/index', {
        employees,
        title: "List of Employees"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/employees')
    })
}
function filterSearch(req, res) {
  const query = {}
  query[req.query.filterField] = req.query.filterValue
  Employee.find(query)
    .then(employees => {
      res.render('employees/index', {
        employees,
        title: "List of Employees"
      })
    })
}

function newEmployee(req, res) {
  let maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
  let minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 60))
  res.render('employees/new', {
    title: 'Add New Employee',
    maxdate: maxDate.toISOString().slice(0, 10),
    mindate: minDate.toISOString().slice(0, 10)
  })
}

function createEmployee(req, res) {
  req.body.phoneNumber = req.body.phoneNumber.replaceAll('-', '')
  req.body.manager = req.user.profile._id
  Employee.create(req.body)
    .then(() => {
      res.redirect('/employees')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/employees')
    })
}

function showEmployee(req, res) {
  Employee.findById(req.params.employeeId)
    .populate('manager')
    .then(employee => {
      Review.find({ _id: { $in: employee.reviews } })
        .then(reviews => {
          res.render('employees/show', {
            title: "Employee Detail",
            employee: employee,
            reviews: reviews
          })
        })
        .catch(err => {
          console.log(err)
          res.redirect('/employees')
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/employees')
    })
}

function editEmployee(req, res) {
  let maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
  let minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 60))
  Employee.findById(req.params.employeeId)
    .then(employee => {
      if (employee.manager.equals(req.user.profile._id)) {
        res.render('employees/edit', {
          title: "Edit Employee Detail",
          employee: employee,
          maxdate: maxDate.toISOString().slice(0, 10),
          mindate: minDate.toISOString().slice(0, 10)
        })
      } else {
        throw new Error('🚫 Not authorized 🚫')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/employees')
    })
}

function updateEmployee(req, res) {
  Employee.findById(req.params.employeeId)
    .then(employee => {
      if (employee.manager.equals(req.user.profile._id)) {
        req.body.phoneNumber = req.body.phoneNumber.replaceAll("-", "")
        employee.updateOne(req.body)
          .then(() => {
            res.redirect(`/employees/${employee._id}`)
          })
          .catch(err => {
            console.log(err)
            res.redirect('/employees')
          })
      }
      else {
        throw new Error('🚫 Not authorized 🚫')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/employees`)
    })
}

function removeEmployee(req, res) {
  Employee.findByIdAndDelete(req.params.employeeId)
    .then(employee => {
      Review.deleteMany({ _id: { $in: employee.reviews } })
        .then(() => {
          res.redirect('/employees')
        })
        .catch(err => {
          console.log(err)
          res.redirect('/employees')
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/employees')
    })
}

function createReview(req, res) {
  Employee.findById(req.params.employeeId)
    .then(employee => {
      Review.create(req.body)
        .then(review => {
          employee.reviews.push(review._id)
          employee.save()
            .then(() => {
              res.redirect(`/employees/${employee._id}`)
            })
            .catch(err => {
              console.log(err)
              res.redirect('/employees')
            })
        })
        .catch(err => {
          console.log(err)
          res.redirect('/employees')
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/employees')
    })
}

function deleteReview(req, res) {
  let empId = req.params.employeeId
  Review.findByIdAndDelete(req.params.reviewId)
    .then(() => {
      Employee.updateMany({}, { $pull: { 'reviews': { $in: [req.params.reviewId] } } })
        .then(() => {
          res.redirect(`/employees/${empId}`)
        })
        .catch(err => {
          console.log(err)
          res.redirect('/employees')
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/employees')
    })
}

export {
  index,
  filterSearch,
  newEmployee as new,
  createEmployee as create,
  showEmployee as show,
  editEmployee as edit,
  updateEmployee as update,
  removeEmployee as remove,
  createReview,
  deleteReview
}