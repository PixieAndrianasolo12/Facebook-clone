import React from 'react';

function PostModal({ isOpen, onClose, onSubmit, postContent, onPostContentChange, onFileChange }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <form onSubmit={onSubmit} encType="multipart/form-data">
                    <div className="p-4 border-b border-gray-200 flex items-start space-x-4">
                        <img src="./images/profile_photo_cat.jpg" alt="Profile picture" className="w-12 h-12 rounded-full" />
                        <textarea
                            className="flex-1 bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-700 text-base placeholder-gray-500"
                            value={postContent}
                            onChange={onPostContentChange}
                            placeholder="What's on your mind?"
                        />
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        <input
                            type="file"
                            multiple
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                            onChange={onFileChange}
                        />
                    </div>
                    <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostModal;
