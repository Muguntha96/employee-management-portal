import { Employee } from "../models/employee.js"

function index(req,res){
  Employee.find({})
  .then(employees =>{
    res.render('employees/index',{
      employees,
      title:"All Employees"
    })
  })
}
function newEmployee(req,res){
res.render('employees/new',{
  title:'ADD EMPLOYEE'
})
}
export{
  index,
  newEmployee as new
}