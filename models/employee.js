import mongoose from "mongoose"

const Schema=mongoose.Schema

const employeeSchema=new Schema({
  
  firstName:{type:String,required:true},
  lastName:{type:String,required:true},
  dob:{type:Date,required:true},
  address:{type:String,required:true},
  salary:{type:Number,required:true},
  phoneNumber:{type:Number,required:true},
  department:{
    type:String,
    required:true,
    enum:['Admin','Finance','Support','HR','IT']
  },
  manager:{ type: Schema.Types.ObjectId, ref: 'Profile' },
  reviews:[{type: Schema.Types.ObjectId, ref: 'Review'}],
},{
  timestamps:true
})

const Employee=mongoose.model('Employee',employeeSchema)

export{
  Employee
}