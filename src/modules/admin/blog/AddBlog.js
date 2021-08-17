import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { projectFirestore, timestamp } from "../../../firebase";
import useStorage from "../../../hooks/useStorage";
import { getThumbnailUrl } from "../../../helpers/getThumbnailUrl";

const AddBlog = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const blogTitleRef = useRef(null);
  const blogTextRef = useRef(null);
  const publishDateRef = useRef(null);
  const history = useHistory();

  const types = ["image/png", "image/jpeg", "image/webp"];
  const { url, progress, fileName } = useStorage(file);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image200Url = await getThumbnailUrl(fileName, 200);
    const image480Url = await getThumbnailUrl(fileName, 480);
    const createdAt = timestamp();
    blogCollectionRef.add({
      imageUrl: url,
      image200Url,
      image480Url,
      blogTitle: blogTitleRef.current.value,
      blogText: blogTextRef.current.value,
      publishDate: new Date(publishDateRef.current.value),
      createdAt,
    });
    setFile(null);
    history.push("/admin/blog");
  };

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile, fileName]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={changeHandler} required />
        <div>
          {error && <div>{error}</div>}
          {file && <div>{file.name}</div>}
          {fileName && <div>{fileName}</div>}
          {file && <div>{progress}</div>}
          {url && <img src={url} alt="uploaded" />}
        </div>

        <input type="text" ref={blogTitleRef} required />
        <textarea className="border w-full h-48" ref={blogTextRef} required />
        <input type="date" ref={publishDateRef} required />
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
