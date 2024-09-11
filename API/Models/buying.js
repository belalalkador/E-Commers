import mongoose from "mongoose";

const buyingSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

buyingSchema.index({ productId: 1 });
buyingSchema.index({ userId: 1 });

const Buying = mongoose.model("Buying", buyingSchema);

export default Buying;
