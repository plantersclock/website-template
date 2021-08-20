import React, { useState } from "react";
import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";
import LineEllipsis from "react-lines-ellipsis";
import { Link } from "react-router-dom";

import useStorageThumbnails from "../../hooks/useStorageThumbnails";

const BlogCard = ({ imageUrl, title, text, publishDate, id }) => {
  const [cardHovered, setCardHovered] = useState(false);

  const { resizedImageUrl } = useStorageThumbnails(imageUrl, 480);
  const options = {
    timeZone: "UTC",
  };

  publishDate = new Date(publishDate.seconds * 1000).toLocaleDateString(
    "en-US",
    options
  );

  return (
    <Link to={`/admin/blog/${id}`}>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
        className="rounded-lg bg-white shadow-lg overflow-hidden"
      >
        <div className="overflow-hidden w-full h-72">
          {resizedImageUrl && (
            <LazyLoad>
              <motion.img
                animate={cardHovered ? { scale: 1.2 } : { scale: 1 }}
                className="w-full h-72 object-cover"
                src={resizedImageUrl}
                alt={imageUrl}
              />
            </LazyLoad>
          )}
        </div>

        <div className="h-60 p-5 relative overflow-hidden">
          <h2 className="font-bold text-gray-900 font-semibold text-xl">
            {title}
          </h2>
          <div className="text-base mt-3 text-gray-500">
            <LineEllipsis
              text={text}
              maxLine="4"
              ellipsis="..."
              basedOn="letters"
              className="whitespace-pre-wrap"
            />
          </div>

          <div className="font-light text-gray-400 text-xs absolute bottom-2 right-2">
            Published:{publishDate}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogCard;
