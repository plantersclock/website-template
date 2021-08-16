import React, { useEffect, useRef, useState } from "react";
import { projectFirestore, timestamp } from "../../../firebase";
import useStorage from "../../../hooks/useStorage";
const AddBlog = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const blogTextRef = useRef(null);

  const types = ["image/png", "image/jpeg"];

  const { url, progress } = useStorage(file);
  const blogCollectionRef = projectFirestore.collection("blog-posts");

  const changeHandler = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile && types.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdAt = timestamp();
    blogCollectionRef.add({
      imageUrl: url,
      blogText: blogTextRef.current.value,
      createdAt,
    });
    setFile(null);
  };

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={changeHandler} />
        <div>
          {error && <div>{error}</div>}
          {file && <div>{file.name}</div>}
          {file && <div>{progress}</div>}
          {url && <img src={url} alt="uploaded" />}
        </div>
        <textarea className="border w-full h-48" ref={blogTextRef} />
        <button
          className="block bg-blue-500 text-white font-bold py-1 px-2 rounded"
          type="submit"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
