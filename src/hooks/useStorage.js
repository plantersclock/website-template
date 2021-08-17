import { useState, useEffect } from "react";
import { projectStorage } from "../firebase";
import Compress from "react-image-file-resizer";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!file) return;
    setFileName(file.name + "_" + new Date());
    // references
    const storageRef = projectStorage.ref(file.name + "_" + new Date());

    Compress.imageFileResizer(
      file, // the file from input
      1920, // width
      1920, // height
      "JPEG", // compress format WEBP, JPEG, PNG
      90, // quality
      0, // rotation
      (uri) => {
        console.log(uri);
        // You upload logic goes here
        storageRef.put(uri).on(
          "state_changed",
          (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
          },
          (err) => {
            setError(err);
          },
          async () => {
            const url = await storageRef.getDownloadURL();
            setUrl(url);
          }
        );
      },
      "file" // blob or base64 default base64
    );
  }, [file]);

  return { progress, url, error, fileName };
};

export default useStorage;
