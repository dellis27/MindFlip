import { Document, Types } from 'mongoose';
import { Request } from 'express';

// ====================== USER TYPES ======================
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  flashcards: Types.ObjectId[];
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type UserResponse = Omit<IUser, 'password' | 'comparePassword'> & {
  _id: string;
};

// ====================== REQUEST BODIES ======================
export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  user: UserResponse;
  token: string;
}

export interface LoginResponse extends AuthResponse {
  refreshToken?: string;
}


declare global {
  namespace Express {
    interface Request {
      user?: {
       _id: string;
        username: string;
        email: string;
        role: 'user' | 'admin';
      };
    }
  }
}

// ====================== JWT TOKEN TYPES ======================
export interface JwtPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
  iat: number;
  exp: number;
}

// ====================== COOKIE TYPES ======================
export interface TokenCookies {
  accessToken: string;
  refreshToken?: string;
}

// ====================== CONFIG TYPES ======================
export interface AuthConfig {
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
  passwordResetTokenExpiresIn: number;
}