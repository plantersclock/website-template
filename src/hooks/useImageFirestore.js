import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase";

const useImageFirestore = (limit = 100) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsubscribe = projectFirestore
      .collection("image")

      .orderBy("createdAt", "desc")
      .limit(limit)
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return () => unsubscribe();
  }, [limit]);

  return { docs };
};

export default useImageFirestore;
