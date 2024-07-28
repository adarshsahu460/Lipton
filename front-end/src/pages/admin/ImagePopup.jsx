import React from 'react';
import Modal from 'react-modal';

// Custom styles for the modal overlay and content
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    padding: '0',
    maxWidth: '80%',
    maxHeight: '80%',
    margin: 'auto',
    overflow: 'hidden', // Hide scrollbars
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // For positioning the close button
  },
};

Modal.setAppElement('#root');

const ImagePopup = ({ imageUrl, tag, creationDate, isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      className="flex justify-center items-center"
    >
      <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-3xl max-h-[80vh] w-full mx-4 overflow-hidden flex flex-col items-center">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-3xl font-bold focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">{tag}</h2>
        <div className="relative w-full h-[60vh] overflow-hidden">
          <img
            src={imageUrl}
            alt={tag}
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        </div>
        <p className="text-gray-600 mt-4">{creationDate}</p>
      </div>
    </Modal>
  );
};

export default ImagePopup;
