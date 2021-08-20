import { UploadIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { compressImage } from "../../helpers/compressImage";
import { addToDatabase } from "../../helpers/addToDatabase";
import { uploadImage } from "../../helpers/uploadImage";
import ClipLoader from "react-spinners/ClipLoader";

const ImageUploader = ({ modalOpen, setModalOpen, setSelectedImage }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const imageTitleRef = useRef();
  const modalRef = useRef();

  const handleModalClose = (e) => {
    if (loading) return;
    if (!modalRef.current?.contains(e.target)) {
      setModalOpen(false);
    }
  };

  const changeHandler = async (e) => {
    let selectedFile = e.target.files[0];
    const newFile = await compressImage(selectedFile);

    if (!newFile.error) {
      const newFile = await compressImage(selectedFile);
      setFile(newFile);
      setError("");
    } else {
      setFile(null);
      setError(newFile.error);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!imageTitleRef.current.value) {
      setError("Image must have a title");
      return;
    }
    setLoading(true);

    try {
      const url = await uploadImage(file, imageTitleRef.current.value);
      let status = await addToDatabase("image", {
        url,
        title: imageTitleRef.current.value,
      });
      console.log(status);
      setModalOpen(false);
      setFile(null);
      setLoading(false);
      setError("");
      setSelectedImage(url);
    } catch (error) {
      setError(error);
    }
  };
  return (
    <>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleModalClose}
          className="fixed flex justify-center  bg-black top-0 left-0 w-screen h-screen bg-opacity-20"
        >
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            ref={modalRef}
            className="bg-white p-12 rounded-lg m-auto mt-10 relative"
          >
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="file-upload">
                {!file && (
                  <div className="rounded-lg border-2 border-gray-300 border-dashed font-medium text-gray-300 h-72 w-72">
                    <UploadIcon />
                  </div>
                )}
                {file && (
                  <div className="relative">
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      src={URL.createObjectURL(file)}
                      alt="uploaded"
                      className="object-cover rounded-lg h-72 w-72"
                    />
                    {loading && (
                      <div className="absolute left-0 top-0 bg-opacity-10 rounded-lg z-10 w-full h-full bg-black flex items-center justify-center">
                        <ClipLoader
                          className="h-40 w-40"
                          size={150}
                          color={"white"}
                        />
                      </div>
                    )}
                  </div>
                )}
              </label>

              <div className="mt-3">
                <label
                  htmlFor="image-title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    ref={imageTitleRef}
                    required
                    id="image-title"
                    name="image-title"
                    type="text"
                    autoComplete="off"
                    placeholder="Give this image a title"
                    className="max-w-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="mt-3">
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={changeHandler}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-gray-500 text-white rounded py-1 px-2 hover:bg-gray-600"
              >
                Add Image
              </button>
              {error}
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
export default ImageUploader;
