import { projectFirestore, timestamp } from "../firebase";

export const addToDatabase = async (collectionName, data) => {
  const createdAt = timestamp();
  const blogCollectionRef = projectFirestore.collection(collectionName);
  try {
    let promise = new Promise((resolve) =>
      blogCollectionRef
        .add({
          ...data,
          createdAt,
        })
        .then(resolve)
    );

    return await promise;
  } catch (error) {
    return { error: error };
  }
};
