import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Rename the local declaration
const LocalUser = {
  name: 'John Doe',
};

// Interface for TypeScript
export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin'; // Role property
  flashcards: Schema.Types.ObjectId[]; // Reference to flashcards
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>; // Instance method
}

// Static methods interface
interface IUserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser>; // Static method
}

// User schema definition
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  flashcards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Flashcard',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to hash passwords
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static method for login
userSchema.statics.login = async function (
  email: string,
  password: string
): Promise<IUser> {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  return user;
};

// Create and export the User model
export const User = model<IUser, IUserModel>('User', userSchema);