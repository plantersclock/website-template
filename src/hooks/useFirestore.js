import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase";

const useFirestore = (collectionName, limit, published = false) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let currentTime = new Date(9999, 1, 1);
    if (published) {
      currentTime = new Date();
    }

    const unsubscribe = projectFirestore
      .collection(collectionName)
      .where("publishDate", "<", currentTime)
      .orderBy("publishDate", "desc")
      .limit(limit)
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return () => unsubscribe();
  }, [collectionName, limit, published]);

  return { docs };
};

export default useFirestore;
