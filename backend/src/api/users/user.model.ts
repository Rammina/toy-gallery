import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  toysOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Toy' }],
  registerDate: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('User', UserSchema);
