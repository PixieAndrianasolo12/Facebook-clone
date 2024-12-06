import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { InertiaLink } from '@inertiajs/inertia-react';

const Dashboard = ({ users, auth }) => {
    const user = auth.user;

    const getRequestStatus = (userId) => {
        const friendRequests = auth.user.friendRequests || []; // Assurez-vous que friendRequests est défini ou utilisez un tableau vide
        const check = friendRequests.find(
            request => request.sender_id === auth.user.id && request.receiver_id === userId
        );
        if (check) {
            return check.status === 'pending' ? 'black' : check.status === 'accepted' ? 'green' : 'red';
        }
        return 'red';
    };

    // Filtrer les utilisateurs pour éviter les doublons basés sur receiver.id
    const uniqueUsers = Array.from(new Set(users.map(user => user.receiver.id))).map(id => {
        return users.find(user => user.receiver.id === id);
    });

    return (
        <div>

            <AuthenticatedLayout user={auth.user}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold text-gray-700 text-center mb-5">
                            Liste d'amis ({uniqueUsers.length})
                        </h1>
                        {uniqueUsers.map(user => (
                            user.receiver && (
                                <div key={user.receiver.id} className="bg-white p-4 shadow-md rounded-md flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <div className="mr-4">
                                            <img
                                                src={`/avatars/${user.receiver.avatar}`}
                                                className="w-16 h-16 rounded-full object-cover"
                                                alt="Avatar"
                                            />
                                        </div>
                                        <div>
                                            <h1 className="text-lg font-medium text-gray-700">{user.receiver.name}</h1>
                                            <p className="text-gray-600">{user.receiver.email}</p>
                                        </div>
                                    </div>
                                    <InertiaLink
                                        href={route('sendfriendrequest', { user: user.receiver.id })}
                                        style={{ backgroundColor: getRequestStatus(user.receiver.id), color: 'white' }}
                                        className="px-3 py-1 rounded-md hover:bg-red-600"
                                    >
                                        Retirer sur la liste d'amis
                                    </InertiaLink>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
};

export default Dashboard;
