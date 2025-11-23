import mongoose, { Schema, models, model } from "mongoose";

const beritaSchema = new Schema(
  {
    title: String,
    content: String,
    image: String,
  },
  { timestamps: true }
);

export default models.Berita || model("Berita", beritaSchema);
