import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ListeDesUtilisateurs = ({ users, currentUser, friendRequests, auth }) => {
    const handleFriendRequest = (userId) => {
        console.log(`Envoyer une invitation à l'utilisateur avec l'ID ${userId}`);
    };

    const renderInviteButton = (user) => {
        if (!currentUser || !friendRequests) {
            return null;
        }

        const check = friendRequests.find(req =>
            (req.sender_id === currentUser.id && req.receiver_id === user.id) ||
            (req.sender_id === user.id && req.receiver_id === currentUser.id)
        );

        let buttonStyle = 'blue';
        let buttonText = 'Envoyer une invitation';
        if (check) {
            if (check.status === 'pending') {
                buttonStyle = 'black';
                buttonText = 'Annuler Invitation';
            } else if (check.status === 'accepted') {
                buttonStyle = 'green';
                buttonText = 'Déjà Ami';
            }
        }

        return (
            <a
                href={`/request/${user.id}`}
                style={{ backgroundColor: buttonStyle, color: 'white' }}
                className="px-3 py-1 rounded-md hover:bg-blue-600"
            >
                {buttonText}
            </a>
        );
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-700 text-center mb-5">
                        Liste des utilisateurs ({users.length})
                    </h1>
                    {users.map(user => (
                        <div key={user.id} className="bg-white p-4 shadow-md rounded-md flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <InertiaLink
                                        href={`/profile/${user.id}`} // Assurez-vous d'adapter l'URL de profil selon votre route
                                        className="w-16 h-16 rounded-full overflow-hidden"
                                    >
                                       <img
                                    src={`/avatars/${user.avatar}`}
                                    className="w-16 h-16 rounded-full object-cover"
                                    alt="Avatar"
                                />
                                    </InertiaLink>
                                </div>
                                <div>
                                    <h1 className="text-lg font-medium text-gray-700">{user.name}</h1>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                            </div>
                            {renderInviteButton(user)}
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ListeDesUtilisateurs;
