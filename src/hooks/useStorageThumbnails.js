import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase";
import { getImageUrlFromUrl } from "../helpers/getImageUrlFromUrl";

const useStorageThumbnails = (imageUrl, size, id = null, updated) => {
  const [resizedImageUrl, setResizedImageUrl] = useState(null);
  const blogCollectionRef = projectFirestore.collection("blog-posts");

  useEffect(() => {
    if (updated) return;
    const getData = async () => {
      const resizedImageUrl = await getImageUrlFromUrl(imageUrl, size);
      setResizedImageUrl(resizedImageUrl);
      if (id) {
        try {
          blogCollectionRef.doc(id).update({
            [`image${size.toString()}Url`]: resizedImageUrl,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData();
  }, [resizedImageUrl, imageUrl, size, blogCollectionRef, id, updated]);

  return { resizedImageUrl };
};
export default useStorageThumbnails;
