import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String, // Assuming address is a simple string. Adjust if you need a more complex structure.
      required: true,
    },
    emergencyContact: {
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ['senior', 'volunteer'],
      required: true,
    },
    skills: {
      type: [String], // Only for volunteers
    },
    availability: {
      type: Map,
      of: Boolean, // Availability times can be stored as key-value pairs, e.g., { "Monday": true }
    },
    verified: {
      type: Boolean,
      default: false, // For email verification
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);