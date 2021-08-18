import { Link, useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import useFirestoreById from "../../../hooks/useFirestoreById";

const PreviewBlogPost = () => {
  let { id } = useParams();
  const { blogData } = useFirestoreById("blog-posts", id);

  return (
    <>
      {blogData && (
        <div className="relative">
          <Link
            className="absolute top-0 right-0"
            to={`/admin/blog/update/${id}`}
          >
            Update
          </Link>
          <h1>{blogData.blogTitle}</h1>
          <img
            src={blogData.imageUrl}
            className="h-4/6 w-full object-cover"
            alt="blogmain"
          />
          <ReactMarkdown className="whitespace-pre-wrap">
            {blogData.blogContent}
          </ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default PreviewBlogPost;
