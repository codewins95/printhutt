import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    metaKeywords: String,
    metaDescription: String,
    image: {
      url: {},
      public_id: {},
      fileType: {},
    },
    level: { type: Number, default: 0 },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
