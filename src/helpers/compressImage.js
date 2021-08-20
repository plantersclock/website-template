import Compress from "react-image-file-resizer";

export const compressImage = async (file) => {
  console.log("start of compression");
  const types = ["image/png", "image/jpeg", "image/webp"];

  // async magic goes here...
  if (file === "" || !types.includes(file.type)) {
    console.error(`not an image, the image file is a ${typeof file}`);
    return { error: "Please upload a JPEG or PNG" };
  }

  const newFile = new Promise((resolve) => {
    Compress.imageFileResizer(
      file, // the file from input
      1920, // width
      1920, // height
      "JPEG", // compress format WEBP, JPEG, PNG
      90, // quality
      0, // rotation
      (uri) => {
        resolve(uri);
      },
      "file" // blob or base64 default base64
    );
  });

  return await newFile;
};
