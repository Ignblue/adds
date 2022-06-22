const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const addSchema = new mongoose.Schema({
  item: 
  {type:String},
  description:{type:String},
price:{type:Number},
photo:{type:String},
user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User'
} 
})

addSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Add', addSchema)