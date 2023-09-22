import mongoose from "mongoose"

const Schema=mongoose.Schema

const employeeSchema=new Schema({
  firstName:String,
  lastName:String,
  dob:Date,
  address:String,
  salary:Number,
  phoneNumber:String,
  department:{
    type:String,
    enum:['Admin','Finance','Support','HR','IT']
  },
  manager:{ type: Schema.Types.ObjectId, ref: 'Profile' }
 },{
  timestamps:true
})

const Employee=mongoose.model('Employee',employeeSchema)

export{
  Employee
}