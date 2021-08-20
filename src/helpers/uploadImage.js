import { projectStorage } from "../firebase";

export const uploadImage = async (file, title) => {
  console.log("Uploading");
  // async magic goes here...
  if (file === "") {
    console.error(`not an image, the image file is a ${typeof file}`);
  }
  const storageRef = projectStorage.ref(title);

  const url = new Promise((resolve) => {
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        console.log(snap);
      },
      (err) => {
        if (err) {
          resolve({ error: err });
        }
      },
      async () => {
        const newUrl = await storageRef.getDownloadURL();
        resolve(newUrl);
      }
    );
  });

  return await url;
};
