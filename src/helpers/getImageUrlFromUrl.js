import { projectStorage } from "../firebase";

export const getImageUrlFromUrl = async (url, size = null) => {
  // const [url, setUrl] = useState(null);

  // references
  let sizeString = "";
  if (size) {
    sizeString = "_" + size.toString() + "x" + size.toString();
  }

  const httpsRef = projectStorage.refFromURL(url);
  const fileName = httpsRef.name;

  const searchFileName = fileName + sizeString;

  const storageRef = projectStorage.ref(searchFileName);

  const altUrl = await storageRef.getDownloadURL();

  return altUrl;
};
