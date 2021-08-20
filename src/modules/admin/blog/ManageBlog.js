import { Link } from "react-router-dom";
import BlogGrid from "../../blog/BlogGrid.js";

const ManageBlog = ({ docs, setDisplayCount, displayCount }) => {
  const handleShowMoreClick = () => {
    setDisplayCount((prevDisplayCount) => prevDisplayCount + 3);
  };

  console.log(docs);
  return (
    <>
      {docs && (
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
          {docs && (
            <>
              <BlogGrid displayCount={displayCount} docs={docs} />
              <div className="mt-4 flex justify-center">
                {docs.length > 6 && (
                  <div
                    onClick={handleShowMoreClick}
                    className="rounded-md cursor-pointer py-1 px-2 bg-gray-300 hover:bg-gray-400 text-gray-500 text-sm w-auto"
                  >
                    Show More
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ManageBlog;
