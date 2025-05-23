import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Interface for TypeScript
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  flashcards: Schema.Types.ObjectId[];
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Static methods interface (optional)
interface UserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser>;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin'; // Add the role property
  // Add other properties here
}

const userSchema = new Schema<IUser, UserModel>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false, // Never return password in queries
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

// Password hashing middleware
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static login method (alternative to controller)
userSchema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) throw new Error('Incorrect email');
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Incorrect password');
  return user;
};

export const User = model<IUser, UserModel>('User', userSchema);