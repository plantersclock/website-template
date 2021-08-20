import React, { useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { projectFirestore, timestamp } from "../../../firebase";

import useFirestoreById from "../../../hooks/useFirestoreById";
import ImageSelect from "../../common/ImageSelect";

const UpdateBlogPost = () => {
  const [error, setError] = useState("");
  const [url, setUrl] = useState(null);
  const blogTitleRef = useRef(null);
  const blogSummaryRef = useRef(null);
  const blogContentRef = useRef(null);
  const publishDateRef = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  const { blogData } = useFirestoreById("blog-posts", id);

  const blogCollectionRef = projectFirestore.collection("blog-posts");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createdAt = timestamp();
      blogCollectionRef.doc(id).update({
        imageUrl: url || blogData.imageUrl,
        blogTitle: blogTitleRef.current.value,
        blogSummary: blogSummaryRef.current.value,
        blogContent: blogContentRef.current.value,
        publishDate: new Date(publishDateRef.current.value),
        createdAt,
      });

      history.push("/admin/blog");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      {blogData && (
        <>
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-gray-700"
          >
            Select Main Image
          </label>
          <ImageSelect setSelectedUrl={setUrl} defaultUrl={blogData.imageUrl} />
          <form onSubmit={handleSubmit}>
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
                  defaultValue={blogData.blogTitle}
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
                  defaultValue={blogData.blogSummary}
                  required
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
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
                  defaultValue={blogData.blogContent}
                  required
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
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
                  defaultValue={
                    new Date(blogData.publishDate.seconds * 1000)
                      .toISOString("en-US", {
                        timeZone: "UTC",
                      })
                      .split("T")[0]
                  }
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
        </>
      )}
    </div>
  );
};

export default UpdateBlogPost;
