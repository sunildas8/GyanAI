import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    title: {
      type: String,
      required: [true, "Chat title is required"],
      trim: true,
      maxlength: [200, "Title must not exceed 200 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Middleware to update the updatedAt field before saving
chatSchema.pre("save", async function() {
  this.updatedAt = Date.now();
});

// Index for faster queries by user
chatSchema.index({ user: 1, createdAt: -1 });

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;
