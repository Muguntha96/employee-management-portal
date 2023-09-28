import mongoose from "mongoose"

const Schema = mongoose.Schema
const reviewSchema = new Schema({
  content: String,
}, {
  timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

export {
  Review
}