import { useEffect, useState } from "react";
import { getImageUrlFromUrl } from "../helpers/getImageUrlFromUrl";

const useStorageThumbnails = (imageUrl, size) => {
  const [resizedImageUrl, setResizedImageUrl] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const resizedImageUrl = await getImageUrlFromUrl(imageUrl, size);
      setResizedImageUrl(resizedImageUrl);
    };
    getData();
  }, [resizedImageUrl, imageUrl, size]);

  return { resizedImageUrl };
};
export default useStorageThumbnails;
