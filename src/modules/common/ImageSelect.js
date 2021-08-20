import React, { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import useImageFirestore from "../../hooks/useImageFirestore";

import ImageThumbnail from "./ImageThumbnail";
import { timestampToDate } from "../../helpers/timestampToDate";
import { PhotographIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";

const ImageSelect = ({
  className = null,
  setSelectedUrl,
  defaultUrl = null,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(50);
  const [selectedImage, setSelectedImage] = useState(defaultUrl);
  const { docs } = useImageFirestore(displayCount);

  useEffect(() => {
    if (setSelectedUrl) {
      setSelectedUrl(selectedImage);
    }
  }, [selectedImage, setSelectedUrl]);

  return (
    <div
      className={
        "flex flex-col items-center sm:items-start sm:flex-row md:flex-col lg:flex-row " +
        className
      }
    >
      <div className="h-72 w-full sm:w-72 md:w-96">
        {!selectedImage && (
          <div className="rounded-lg border-2 border-gray-300 border-dashed font-medium text-gray-300 w-72 h-72 md:w-96 flex justify-center">
            <PhotographIcon />
          </div>
        )}
        {selectedImage && (
          <div className="rounded-lg h-72 sm:w-72 md:w-96">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={selectedImage}
              alt="uploaded"
              className="object-cover rounded-lg sm:w-72 md:w-96 h-72"
            />
          </div>
        )}
      </div>
      <div className="flex-grow sm:ml-3 w-full mt-3 sm:mt-0 md:ml-0 lg:ml-3 md:mt-3 lg:mt-0">
        <div className="overflow-auto h-72 bg-white">
          {docs &&
            docs.map((doc) => (
              <div
                key={doc.id}
                className={
                  selectedImage === doc.url
                    ? "flex border-t border-b cursor-pointer bg-blue-200"
                    : "flex border-t border-b cursor-pointer hover:bg-blue-100"
                }
                onClick={() => setSelectedImage(doc.url)}
              >
                <div>
                  <ImageThumbnail
                    className="h-12 w-16 object-cover"
                    url={doc.url}
                    size={200}
                  />
                </div>
                <div className=" flex w-full items-center justify-between">
                  <div className="ml-6">{doc.title}</div>
                  {doc.createdAt && (
                    <div className="mr-3">
                      {timestampToDate(doc.createdAt.seconds * 1000)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          {displayCount.length > 50 && (
            <div
              className="text-center bg-gray-200 hover:bg-gray-300"
              onClick={() =>
                setDisplayCount((prevDisplayCount) => prevDisplayCount + 10)
              }
            >
              Show More
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="mt-3 bg-gray-500 hover:bg-gray-600 text-white py-1 px-2 rounded"
            onClick={() => setModalOpen(true)}
          >
            Add Image
          </button>
        </div>
      </div>
      <ImageUploader
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default ImageSelect;
