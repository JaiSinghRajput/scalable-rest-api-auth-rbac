import { HydratedDocument, Model, Schema, Types, model } from "mongoose";

import { TaskPriority, TaskStatus } from "./task.types";

export interface ITask {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskDocument = HydratedDocument<ITask>;

type TaskModel = Model<ITask>;

const taskSchema = new Schema<ITask, TaskModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: ""
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
      index: true
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
      index: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
        plain.userId = String(plain.userId);
        delete plain._id;
      }
    }
  }
);

taskSchema.index({ userId: 1, createdAt: -1 });

export const TaskModel = model<ITask, TaskModel>("Task", taskSchema);
