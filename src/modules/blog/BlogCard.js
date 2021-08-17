import React from "react";
import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";

const BlogCard = ({ imageUrl, title, text, publishDate }) => {
  const options = {
    timeZone: "UTC",
  };

  publishDate = new Date(publishDate.seconds * 1000).toLocaleDateString(
    "en-US",
    options
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="rounded-lg bg-white shadow-lg overflow-hidden"
    >
      <div className="overflow-hidden w-full h-60">
        <LazyLoad>
          <motion.img
            whileHover={{ scale: 1.2 }}
            className="w-full h-60 object-cover"
            src={imageUrl}
            alt="blog upload"
          />
        </LazyLoad>
      </div>

      <div className="h-60 p-5 relative">
        <h2 className="font-bold text-gray-900 font-semibold text-xl">
          {title}
        </h2>

        <p className="text-base mt-3 text-gray-500">{text}</p>
        <h3 className="font-light text-gray-400 text-xs absolute bottom-2 right-2">
          Published:{publishDate}
        </h3>
      </div>
    </motion.div>
  );
};

export default BlogCard;
