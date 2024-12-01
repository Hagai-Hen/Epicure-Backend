import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

const images = [
  "src/pictures/claro.svg",
  "src/pictures/garbanzo_frito.svg",
  "src/pictures/kitchen_market.svg",
  "src/pictures/lumina.svg",
  "src/pictures/mashya.svg",
  "src/pictures/onza.svg",
  "src/pictures/smoked_pizza.svg",
  "src/pictures/tiger_lily.svg",
  "src/pictures/yossi_shitrit.svg",
  "src/pictures/pad_ki_mao.svg",
];

(async function run() {
  for (const img of images) {
    try {
      const res = await cloudinary.uploader.upload(img);
      console.log(img, res.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
})();
