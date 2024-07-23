import axios from 'axios';
import React, { useState, useRef } from 'react';

export function Images() {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [tag, setTag] = useState("");
    const [imageList, setImageList] = useState([{
        url : "./uploads/1721720001003-Screenshot (210).png",
        tag : "Samosa"
    }]);
    

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleTagChange = (event) => {
        setTag(event.target.value);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('billImage', file);
        formData.append('tag', tag);

        try {
            console.log("Frontend " + tag);
            const response = await axios.post('http://localhost:3000/api/v1/admin/uploadImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            console.log(response.data);
            alert('File uploaded successfully');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            alert('An error occurred while uploading the file.');
        }
    };

    return (
        <div className="flex flex-col w-full bg-gray-100 min-h-screen p-8">
            <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Image Upload</h2>
                    <div className="flex flex-col items-center space-y-6">
                        {/* File Input */}
                        <input 
                            type="file"  
                            name="billImage" 
                            onChange={handleFileChange} 
                        />

                        {/* Tag Input */}
                        <div className="w-full max-w-md">
                            <label htmlFor="image-tag" className="block text-gray-700 font-medium mb-2">
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
                        
                        {/* Upload Button */}
                        <button
                            onClick={handleUpload}
                            className="px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg shadow-lg hover:from-teal-500 hover:to-teal-700 transition duration-300 w-full max-w-md text-base font-medium"
                        >
                            Upload
                        </button>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Your Images</h2>
                    {/* Add image display logic here */}
                    <div className="flex flex-wrap gap-4">
                        {
                            imageList.map((image, index) => {
                                return (
                                    <div key={index} className="w-32 h-32 bg-gray-200 rounded-lg shadow-md flex items-center justify-center text-gray-500">
                                      <img src={image.url} alt={image.tag} className="w-full h-full object-cover rounded-lg" />
                                      <span className="absolute text-white bg-black bg-opacity-50 px-2 py-1 rounded">{image.tag}</span>
                                    </div>
                                  ); 
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
