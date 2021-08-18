import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { projectFirestore, timestamp } from "../../../firebase";
import useStorage from "../../../hooks/useStorage";
import { getThumbnailUrl } from "../../../helpers/getThumbnailUrl";
import { PhotographIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";

const AddBlogPost = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const blogTitleRef = useRef(null);
  const blogSummaryRef = useRef(null);
  const blogContentRef = useRef(null);
  const publishDateRef = useRef(null);
  const history = useHistory();

  const types = ["image/png", "image/jpeg", "image/webp"];
  const { url, progress, fileName } = useStorage(file);

  const blogCollectionRef = projectFirestore.collection("blog-posts");

  const changeHandler = (e) => {
    let selectedFile = e.target.files[0];

    setLoading(true);
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
      blogSummary: blogSummaryRef.current.value,
      blogContent: blogContentRef.current.value,
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
  }, [url, setFile]);

  useEffect(() => {
    if (progress && progress < 100) {
      setLoading(true);
    } else setLoading(false);
  }, [progress, setLoading]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="h-72 w-72">
          {!url && !loading && !file && (
            <div className="rounded-lg border-2 border-gray-300 border-dashed font-medium text-gray-300 h-72 w-72">
              <PhotographIcon />
            </div>
          )}
          {loading && (
            <div className=" rounded-lg border-2 border-gray-300 border-dashed font-medium text-gray-300 h-72 w-72 flex justify-center items-center">
              <ClipLoader color={"blue"} />
            </div>
          )}
          {!loading && url && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              src={url}
              alt="uploaded"
              className="object-cover rounded-lg h-72 w-72"
            />
          )}
        </div>
        <div className="w-72">
          <label htmlFor="file-upload">
            <div className="my-2 bg-white text-center py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Upload Main Photo
            </div>
          </label>
        </div>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          onChange={changeHandler}
          required
        />

        <div>{error && <div>{error}</div>}</div>

        <div className="mt-3">
          <label
            htmlFor="blog-title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <div className="mt-1">
            <input
              ref={blogTitleRef}
              required
              id="blog-title"
              name="blog-title"
              type="text"
              autoComplete="off"
              placeholder="Title the blog post"
              className="max-w-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-3">
          <label
            htmlFor="blog-summary"
            className="block text-sm font-medium text-gray-700"
          >
            Summary
          </label>
          <div className="mt-1">
            <textarea
              id="blog-summary"
              name="blog-summary"
              ref={blogSummaryRef}
              required
              rows={4}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              defaultValue={""}
              placeholder="Give this blog post a summary to be displayed in searches"
            />
          </div>
        </div>
        <div className="mt-3">
          <label
            htmlFor="blog-content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <div className="mt-1">
            <textarea
              id="blog-content"
              name="blog-content"
              ref={blogContentRef}
              required
              rows={10}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              defaultValue={""}
              placeholder="Put the main content for the blog post here"
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="blog-publish-date"
            className="block text-sm font-medium text-gray-700"
          >
            Publish Date
          </label>
          <div className="mt-1">
            <input
              ref={publishDateRef}
              required
              id="blog-publish-date"
              name="blog-publish-date"
              type="date"
              autoComplete="off"
              className="max-w-xs shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <button
          className="mt-3 block bg-blue-500 text-white font-bold py-1 px-2 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlogPost;
