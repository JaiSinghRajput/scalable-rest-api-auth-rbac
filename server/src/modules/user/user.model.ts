import { HydratedDocument, Model, Schema, model } from "mongoose";

import { UserRole } from "./user.types";

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<IUser>;

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 60
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_doc, ret) => {
        const plain = ret as Record<string, unknown>;
        plain.id = String(plain._id);
        delete plain._id;
        delete plain.passwordHash;
      }
    }
  }
);

export const UserModel = model<IUser, UserModel>("User", userSchema);
