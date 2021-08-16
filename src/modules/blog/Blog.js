import React from "react";
import useFirestore from "../../hooks/useFirestore";

const Blog = () => {
  const { docs } = useFirestore("blog-posts");
  console.log(docs);
  return (
    <div className="grid grid-cols-3 gap-3">
      {docs &&
        docs.map((doc) => (
          <div>
            <img src={doc.imageUrl} alt="uploadUrl" />
            <div>{doc.blogText}</div>
          </div>
        ))}
    </div>
  );
};

export default Blog;
