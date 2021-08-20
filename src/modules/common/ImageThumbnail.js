import { motion } from "framer-motion";
import React from "react";
import useStorageThumbnails from "../../hooks/useStorageThumbnails";
import LazyLoad from "react-lazyload";

const ImageThumbnail = ({ url, size, className }) => {
  const { resizedImageUrl } = useStorageThumbnails(url, size);
  return (
    <>
      <LazyLoad>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={className}
          src={resizedImageUrl || url}
          alt={url}
        />
      </LazyLoad>
    </>
  );
};

export default ImageThumbnail;
