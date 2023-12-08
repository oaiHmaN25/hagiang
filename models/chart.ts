import mongoose, { Schema } from "mongoose";

const nodeSchema = new Schema(
  {
    id: String,
    data: {
      label: String,
    },
    resizing: Boolean,
    position: {
      x: Number,
      y: Number,
    },
    deletable: Boolean,
    width: Number,
    height: Number,
    selected: Boolean,
    positionAbsolute: {
      x: Number,
      y: Number,
    },
    dragging: Boolean,
  },
  { _id: false },
);

const edgeSchema = new Schema(
  {
    source: String,
    sourceHandle: String,
    target: String,
    targetHandle: String,
    id: String,
  },
  { _id: false },
);

const chartSchema = new Schema(
  {
    nodes: [nodeSchema],
    edges: [edgeSchema],
  },
  { _id: false },
);

const fileSchema = new Schema({
  fileName: String,
  chart: chartSchema,
});

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    title: String,
    files: [fileSchema],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
