import { populate } from "dotenv"
import { Employee } from "../models/employee.js"

function index(req,res){
  Employee.find({})
  .then(employees =>{
    res.render('employees/index',{
      employees,
      title:"All Employees"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/employees')
  })
}

function newEmployee(req,res){
res.render('employees/new',{
  title:'Add New Employee',
})
}

function createEmployee(req,res){
  console.log(req.body)
  req.body.manager = req.user.profile._id
 Employee.create(req.body)
.then(employee =>{
  res.redirect('/employees')
})
.catch(err => {
  console.log(err)
  res.redirect('/employees')
})
}

function showEmployee(req,res){
  Employee.findById(req.params.employeeId)
  .populate('manager')
   .then(employee =>{
          res.render('employees/show',{
      title:"Employee Detail",
      employee:employee
          })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/employees')
  })
}

function editEmployee(req,res){
  Employee.findById(req.params.employeeId)
  .then(employee =>{
    console.log(employee)
    res.render('employees/edit',{
      title:"Edit Employee Detail",
      employee:employee
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/employees')
  })
}

function updateEmployee(req,res){
  Employee.findByIdAndUpdate(req.params.employeeId,req.body,{new:true})
  .then(employee =>{
    console.log(employee)
    res.redirect(`/employees/${employee._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/employees')
  })
}
function removeEmployee(req,res){
  Employee.findByIdAndDelete(req.params.employeeId)
  .populate('manager')
  .then( employee =>{
    res.redirect('/employees')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/employees')
  })

}
export{
  index,
  newEmployee as new,
  createEmployee as create,
  showEmployee as show,
  editEmployee as edit,
updateEmployee as update,
removeEmployee as remove
}