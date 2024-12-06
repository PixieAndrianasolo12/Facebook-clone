import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function MyUserView({ user: initialUser, friends: initialFriends, auth }) {
    const [avatar, setAvatar] = useState(null);
    const [user, setUser] = useState(initialUser);
    const [friends, setFriends] = useState(initialFriends);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const getRequestStatus = (userId) => {
        const friendRequests = auth.user.friendRequests || [];
        const check = friendRequests.find(
            request => request.sender_id === auth.user.id && request.receiver_id === userId
        );
        if (check) {
            return check.status === 'pending' ? 'black' : check.status === 'accepted' ? 'green' : 'red';
        }
        return 'gray';
    };

    const getButtonText = (status) => {
        if (status === 'black') return 'Demande envoyée';
        if (status === 'green') return 'Amis';
        return 'Retirer un ami';
    };

    const handleRemoveFriend = (friendId) => {
        Inertia.post('/remove-friend', { friend_id: friendId }, {
            onSuccess: () => {
                console.log('Ami retiré avec succès.');
                // Mettre à jour la liste des amis pour ne plus afficher l'ami retiré
                setFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendId));
                // Rediriger vers la page MyUserView après le retrait de l'ami
                Inertia.visit('/myuserview');
            },
            onError: (errors) => {
                console.error('Erreur lors du retrait de l\'ami :', errors);
            },
        });
    };

    const requestStatus = getRequestStatus(user.id);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
                                        onClick={openModal}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center flex-col mt-5 mb-3.5">
                    <h1 className="text-center font-bold text-3xl">{user.name}</h1>
                    <hr className="flex self-center w-2/3 mt-2" />
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex justify-between mb-2.5">
                        <ul className="flex px-5 py-1.5">
                        </ul>
                        <ul className="flex mb:pl-14">
                            <li className="px-2 font-semibold">
                                {requestStatus === 'red' ? (
                                    <button
                                        onClick={() => handleRemoveFriend(user.id)}
                                        style={{ backgroundColor: getRequestStatus(user.id), color: 'white' }}
                                        className="px-3 py-1 rounded-md hover:bg-red-600"
                                    >
                                        {getButtonText(requestStatus)}
                                    </button>
                                ) : (
                                    <InertiaLink
                                        href={route('sendfriendrequest', { user: user.id })}
                                        style={{ backgroundColor: getRequestStatus(user.id), color: 'white' }}
                                        className="px-3 py-1 rounded-md hover:bg-red-600"
                                    >
                                        {getButtonText(requestStatus)}
                                    </InertiaLink>
                                )}
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
                                            <a href="#" className="text-lg text-blue-700">Voir toutes les photos</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="mr-12 mt-4">
                                    <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                                        <div className="flex justify-between">
                                            <h1 className="font-bold text-xl">Amis</h1>
                                        </div>
                                        <div>
                                            <p className="text-base text-gray-400">{uniqueFriendsList.length} amis</p>
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
                                    <h1 className="font-bold text-xl">Créer une publication</h1>
                                </div>
                                <div className="p-4 shadow rounded-lg bg-white mt-4">
                                    <h1 className="font-bold text-xl">Publication</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-16 flex items-center justify-center bg-black bg-opacity-75">
                        <div className="relative">
                            <img
                                src={user.avatar ? `/avatars/${user.avatar}` : './images/profile_photo_cat.jpg'}
                                className="object-contain"
                                alt="Avatar"
                            />
                            <button
                                className="absolute top-16 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                )}
            </AuthenticatedLayout>
        </div>
    );
}

export default MyUserView;
