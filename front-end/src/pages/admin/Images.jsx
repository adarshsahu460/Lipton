import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { storage } from "../../assets/config/firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ImagePopup from "./ImagePopup";

export function Images() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [tag, setTag] = useState("");
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const URL = import.meta.env.VITE_PUBLIC_URL

  const openPopup = (image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const getImages = async () => {
    const response = await axios.get(
      URL+"/admin/getImages",
      { withCredentials: true }
    );
    setImageList(response.data.message);
  };

  const [img, setImg] = useState("");
  const handleUpload = async () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const formattedDateTime = `${day}-${month}-${year}_${hours}-${minutes}-${seconds}`;
    const imgRef = ref(storage, `${tag} - ${formattedDateTime}.jpg`);
    await uploadBytes(imgRef, img);
    const downloadURL = await getDownloadURL(imgRef);
    await axios.post(
      URL+"/admin/uploadImage",
      {
        tag,
        url: downloadURL,
      },
      {
        withCredentials: true,
      }
    );
    getImages();
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="flex flex-col w-full bg-gray-100 min-h-screen p-8">
      <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Image Upload
          </h2>
          <div className="flex flex-col items-center space-y-6">
            <label className="w-full max-w-md">
              <span className="block text-gray-700 font-medium mb-2">
                Upload Image
              </span>
              <input
                type="file"
                name="billImage"
                onChange={(e) => {
                  setImg(e.target.files[0]);
                }}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:border-0 file:bg-gray-200 file:text-gray-800 file:rounded-lg file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-gray-300 focus:outline-none"
              />
            </label>
            <div className="w-full max-w-md">
              <label
                htmlFor="image-tag"
                className="block text-gray-700 font-medium mb-2"
              >
                Image Tag
              </label>
              <input
                type="text"
                id="image-tag"
                placeholder="Enter tag for image"
                value={tag}
                onChange={handleTagChange}
                className="border border-gray-300 rounded-lg p-3 w-full bg-gray-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <button
              onClick={handleUpload}
              className="px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg shadow-lg hover:from-teal-500 hover:to-teal-700 transition duration-300 w-full max-w-md text-base font-medium"
            >
              Upload
            </button>
          </div>
        </div>

        {/* Gallery starts here */}
        <div>
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900">
            Your Images
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {imageList &&
              imageList.map &&
              imageList.map((image, index) => (
                <div
                  key={index}
                  className=" relative group rounded-lg overflow-hidde shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                >
                  <img
                    src={image.url}
                    alt={image.tag}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-semibold">
                      {image.tag}
                    </span>
                  </div>
                  <div
                    className="absolute bottom-2 right-2 bg-white bg-opacity-75 p-2 rounded-full shadow-lg"
                    onClick={() => openPopup(image)}
                  >
                    <span className="text-gray-800 text-xl font-bold">🔍</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {selectedImage && (
          <ImagePopup
            imageUrl={selectedImage.url}
            tag={selectedImage.tag}
            creationDate={selectedImage.createdAt}
            isOpen={!!selectedImage}
            onRequestClose={closePopup}
          />
        )}
      </div>
    </div>
  );
}
