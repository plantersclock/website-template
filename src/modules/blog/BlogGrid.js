import React from "react";

import BlogCard from "./BlogCard";

const BlogGrid = ({ docs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
      {docs &&
        docs.map((doc) => (
          <BlogCard
            key={doc.id}
            id={doc.id}
            text={doc.blogSummary}
            title={doc.blogTitle}
            publishDate={doc.publishDate}
            imageUrl={doc.imageUrl}
            image480Url={doc.image480Url}
          />
        ))}
    </div>
  );
};

export default BlogGrid;
