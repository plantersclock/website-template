import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase";

const useFirestoreById = (collectionName, id) => {
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    projectFirestore
      .collection(collectionName)
      .doc(id)
      .get()
      .then((doc) => setBlogData(doc.data()));
  }, [id, collectionName]);

  return { blogData };
};

export default useFirestoreById;
