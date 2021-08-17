import { useState } from "react";
import { Link } from "react-router-dom";
import BlogGrid from "../../blog/BlogGrid.js";

const ManageBlog = () => {
  const [displayCount, setDisplayCount] = useState(6);

  const handleShowMoreClick = () => {
    setDisplayCount((prevDisplayCount) => prevDisplayCount + 3);
  };
  return (
    <div>
      <div className="flex justify-end">
        <Link
          to="/admin/blog/add"
          className="rounded-md py-1 px-2 bg-blue-500 text-white font-bold w-auto"
        >
          Add Blog
        </Link>
      </div>

      <div className="mt-4"></div>
      <BlogGrid displayCount={displayCount} />
      <div className="mt-4 flex justify-center">
        <div
          onClick={handleShowMoreClick}
          className="rounded-md py-1 px-2 bg-blue-500 text-white font-bold w-auto"
        >
          Show More
        </div>
      </div>
    </div>
  );
};

export default ManageBlog;
