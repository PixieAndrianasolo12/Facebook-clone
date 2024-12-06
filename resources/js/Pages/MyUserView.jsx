import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function MyUserView({ user: initialUser, friends, auth }) {
    const [avatar, setAvatar] = useState(null);
    const [user, setUser] = useState(initialUser);
    const [showChangeAvatarButton, setShowChangeAvatarButton] = useState(false);
    const [showFileInput, setShowFileInput] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [viewFullScreen, setViewFullScreen] = useState(false);

    const handleAvatarClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setViewFullScreen(false);
    };

    const handleChangeAvatarClick = () => {
        setShowFileInput(true); // Set showFileInput to true when clicking Change Avatar
        setShowModal(false); // Close modal when changing avatar
    };

    const handleViewFullScreenClick = () => {
        setViewFullScreen(true);
        setShowModal(false); // Close modal when viewing avatar in full screen
    };

    const handleChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!avatar) {
            alert('Veuillez sélectionner un fichier avant de soumettre.');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', avatar);

        Inertia.post('/change-avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: (response) => {
                if (response.props.user.avatar) {
                    setUser(prevUser => ({
                        ...prevUser,
                        avatar: response.props.user.avatar,
                    }));
                }
                console.log('Avatar mis à jour avec succès.');
            },
            onError: (errors) => {
                console.error('Erreur lors de la mise à jour de l\'avatar :', errors);
            },
        });
    };

    const uniqueFriends = (friends) => {
        const uniqueIds = new Set();
        return friends.filter(friend => {
            if (!uniqueIds.has(friend.id)) {
                uniqueIds.add(friend.id);
                return true;
            }
            return false;
        });
    };

    const uniqueFriendsList = uniqueFriends(friends);

    return (
        <div className="h-screen">
            <AuthenticatedLayout user={auth.user}>
                <div className="w-full flex justify-center" style={{ height: '348px' }}>
                    <div className="flex flex-col">
                        <div className="md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg bg-gradient-to-b from-gray-100 via-gray-100 to-gray-400" style={{ width: '940px', height: '348px' }}>
                            <img
                                src={user.coverPhoto ? `/cover_photos/${user.coverPhoto}` : './images/default_cover_photo.jpg'}
                                alt="Cover Photo"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div className="">
                                <label htmlFor="avatarInput">
                                    <img
                                        src={user.avatar ? `/avatars/${user.avatar}` : './images/profile_photo_cat.jpg'}
                                        className="md:absolute top-48 inset-x-96 border-4 border-white w-16 h-16 rounded-full object-cover cursor-pointer"
                                        alt="Avatar"
                                        style={{ width: '168px', height: '168px' }}
                                        onClick={handleAvatarClick}
                                    />
                                </label>

                            </div>
                        </div>
                    </div>
                </div>
                {showModal && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-4 rounded-lg">
                            <button className="absolute top-2 right-2 text-gray-500" onClick={handleCloseModal}>
                                <i className="bx bx-x-circle text-2xl"></i>
                            </button>
                            <button
                                className="bg-blue-600 px-5 py-1 rounded-lg text-white font-semibold mb-2"
                                onClick={handleChangeAvatarClick}
                            >
                                Changer l'avatar
                            </button>
                            <button
                                className="bg-gray-600 px-5 py-1 rounded-lg text-white font-semibold mb-2 ml-2"
                                onClick={handleViewFullScreenClick}
                            >
                                Voir le profil
                            </button>
                        </div>
                    </div>
                )}
                {showFileInput && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-4 rounded-lg">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="block"
                                />
                                <button
                                    type="submit"
                                    className="bg-green-600 px-5 py-1 rounded-lg text-white font-semibold mt-2"
                                >
                                    Mettre à jour l'avatar
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {viewFullScreen && (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-lg">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setViewFullScreen(false)}>
                <i className="bx bx-x-circle text-2xl"></i>
            </button>
            <img
                src={user.avatar ? `/avatars/${user.avatar}` : './images/profile_photo_cat.jpg'}
                alt="Avatar"
                className="max-h-screen"
            />
             <button
                onClick={() => setViewFullScreen(false)}
                className="absolute top-0 right-0 mt-2 mr-2 text-white bg-black rounded-full p-2"
            >
                X
            </button>
        </div>
    </div>
)}
                <div className="flex justify-center flex-col mt-5 mb-3.5">
                    <h1 className="text-center font-bold text-3xl">{user.name}</h1>
                    <a href="#" className="text-center text-blue-700 font-semibold">Add Bio</a>
                    <hr className="flex self-center w-2/3 mt-2" />
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex justify-between mb-2.5">
                        <ul className="flex px-5 py-1.5">
                            <li className="px-3 font-semibold text-gray-600"><a href="#">Posts</a></li>
                            <li className="px-3 font-semibold text-gray-600"><a href="#">Friends</a></li>
                            <li className="px-3 font-semibold text-gray-600"><a href="#">Photos</a></li>
                        </ul>
                        <ul className="flex mb:pl-14">
                            <li className="px-2 font-semibold">
                                <button className="bg-gray-200 px-5 py-1 rounded-lg text-black font-semibold">
                                    <i className="bx bx-edit-alt mr-2 text-xl"></i>
                                    Edit Profile
                                </button>
                            </li>
                            <li className="px-2 font-semibold">
                                <button className="bg-gray-200 px-3 py-1 rounded-lg text-black font-semibold">
                                    ...
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-14 shadow bg-white h-screen">
                    <div className="bg-gray-100">
                        <div className="flex justify-center h-screen">
                            <div>
                                <div className="mr-12 mt-4">
                                    <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                                        <h1 className="font-bold text-xl">Intro</h1>
                                    </div>
                                </div>
                                <div className="mr-12 mt-4">
                                    <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                                        <div className="flex justify-between">
                                            <h1 className="font-bold text-xl">Photos</h1>
                                            <a href="#" className="text-lg text-blue-700">See All Photos</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="mr-12 mt-4">
                                    <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                                        <div className="flex justify-between">
                                            <h1 className="font-bold text-xl">Friends</h1>
                                            <InertiaLink href={route('listedes.amis')} className={"text-sm font-medium"} active={route().current('listedes.amis')}>See All Friends</InertiaLink>
                                        </div>
                                        <div>
                                            <p className="text-base text-gray-400">{uniqueFriendsList.length} friends</p>
                                            <div className="grid grid-cols-3 gap-1">
                                                {uniqueFriendsList.map((friend, index) => (
                                                    <div key={index} className="bg-white p-0.5">
                                                        <InertiaLink href={`/profile/${friend.id}`}>
                                                            <img
                                                                src={friend.avatar ? `/avatars/${friend.avatar}` : './images/profile_photo_cat.jpg'}
                                                                className="w-24 h-24 rounded-md mt-2 cursor-pointer object-cover"
                                                                alt="Friend's profile"
                                                            />
                                                        </InertiaLink>
                                                        <InertiaLink href={`/profile/${friend.id}`} className="font-semibold text-sm">
                                                            {friend.name}
                                                        </InertiaLink>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-2/5">
                                <div className="p-4 shadow rounded-lg bg-white">
                                    <h1 className="font-bold text-xl">Create Post</h1>
                                </div>
                                <div className="p-4 shadow rounded-lg bg-white mt-4">
                                    <h1 className="font-bold text-xl">Post</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}

export default MyUserView;
