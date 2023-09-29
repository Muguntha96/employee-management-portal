import mongoose from "mongoose"

const Schema = mongoose.Schema

const employeeSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String, },
  dob: {
    type: Date,
  },
  address: { type: String },
  salary: { type: Number },
  phoneNumber: { type: Number },
  department: {
    type: String,
    enum: ['Admin', 'Finance', 'Support', 'HR', 'IT']
  },
  manager: { type: Schema.Types.ObjectId, ref: 'Profile' },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
  timestamps: true
})

const Employee = mongoose.model('Employee', employeeSchema)

export {
  Employee
}