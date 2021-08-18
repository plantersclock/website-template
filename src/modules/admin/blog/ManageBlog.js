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
          className="rounded-md py-1 px-2 bg-blue-700 hover:bg-blue-800 text-white font-md w-auto"
        >
          Create Blog Post
        </Link>
      </div>

      <div className="mt-4"></div>
      <BlogGrid displayCount={displayCount} />
      <div className="mt-4 flex justify-center">
        <div
          onClick={handleShowMoreClick}
          className="rounded-md cursor-pointer py-1 px-2 bg-gray-300 hover:bg-gray-400 text-gray-500 text-sm w-auto"
        >
          Show More
        </div>
      </div>
    </div>
  );
};

export default ManageBlog;
