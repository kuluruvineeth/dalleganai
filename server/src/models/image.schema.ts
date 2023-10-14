import { Schema, model } from "mongoose";

interface ImageModal {
  prompt: string;
  imageUrl: string;
}

const imageSchema = new Schema<ImageModal>(
  {
    prompt: {
      type: String,
      require: true,
    },
    imageUrl: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Image = model<ImageModal>("images", imageSchema);

export default Image;
