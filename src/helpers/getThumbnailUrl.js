import { projectStorage } from "../firebase";

export const getThumbnailUrl = async (fileName, size = null) => {
  // const [url, setUrl] = useState(null);

  console.log(fileName);
  // references
  let sizeString = "";
  if (size) {
    sizeString = "_" + size.toString() + "x" + size.toString();
  }
  const searchFileName = fileName + sizeString;

  const storageRef = projectStorage.ref(searchFileName);

  const url = await storageRef.getDownloadURL();

  return url;
};
