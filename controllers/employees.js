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
  title:'Add New Employee'
})
}

function create(req,res){
Employee.create(req.body)
.then(employee =>{
  res.redirect('/employees')
})
.catch(err => {
  console.log(err)
  res.redirect('/employees')
})
}

function show(req,res){
  Employee.findById(req.params.employeeId)
  .then(employee =>{
    res.render('employees/show',{
      title:"Employee Detail",
      employee:employee
          })
  })
}


export{
  index,
  newEmployee as new,
  create,
  show,
edit
}