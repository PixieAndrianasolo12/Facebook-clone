import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import PostModal from './PostModal'; // Assure-toi que le chemin est correct

function CreatePost() {
    const [postContent, setPostContent] = useState('');
    const [postFiles, setPostFiles] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePostContentChange = (event) => {
        setPostContent(event.target.value);
    };

    const handlePostFilesChange = (event) => {
        setPostFiles(event.target.files);
    };

    const handlePostSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('content', postContent);

        if (postFiles) {
            for (let i = 0; i < postFiles.length; i++) {
                formData.append('files[]', postFiles[i]);
            }
        }

        Inertia.post('/posts/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            setPostContent(''); // Reset the form after submission
            setPostFiles(null); // Reset the file input
            setIsModalOpen(false); // Close the modal after submission
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <div className="shadow bg-white rounded-lg">
                        <div className="p-2 border-b border-gray-300 flex space-x-4">
                            <img src="./images/profile_photo_cat.jpg" alt="Profile picture" className="w-10 h-10 rounded-full" />
                            <textarea
                                className="bg-gray-100 focus:outline-none w-full h-12 rounded-full p-2 text-gray-500 text-lg placeholder-gray-400"
                                placeholder="What's on your mind?"
                                onClick={openModal}
                                readOnly
                            />
                        </div>
                        <div className="p-2 flex space-x-4">
                            <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-red-500">
                                <h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                </h1>
                                <span className="text-xs sm:text-sm font-semibold text-gray-500">Live video</span>
                            </div>
                            <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-green-500">
                                <h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                </h1>
                                <span className="text-xs sm:text-sm font-semibold text-gray-500">Photo/Video</span>
                            </div>
                             <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-yellow-500">
                                <h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                </h1>
                                <span className="text-xs sm:text-sm font-semibold text-gray-500">Life Event</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PostModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handlePostSubmit}
                postContent={postContent}
                onPostContentChange={handlePostContentChange}
                onFileChange={handlePostFilesChange}
            />
        </div>
    );
}

export default CreatePost;
