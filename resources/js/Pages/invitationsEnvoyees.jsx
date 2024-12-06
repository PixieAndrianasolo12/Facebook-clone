import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { InertiaLink } from '@inertiajs/inertia-react';

const ListeDesInvitations = ({ users, currentUser , auth }) => {
    return (

    <AuthenticatedLayout user={auth.user}>
        <div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-700 text-center mb-5">Invitations envoyées ({users.length})</h1>
                    {users.map(user => (
                        <div key={user.id} className="bg-white p-4 shadow-md rounded-md flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <div className="mr-4">
                                <img
                                    src={`/avatars/${user.receiver.avatar}`}
                                    className="w-16 h-16 rounded-full object-cover"
                                    alt="Avatar" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-medium text-gray-700">{user.receiver.name}</h1>
                                    <p className="text-gray-600">{user.receiver.email}</p>
                                </div>
                            </div>
                            <InertiaLink
                                href={`/cancelFriendRequest/${user.receiver.id}`}
                                style={{ backgroundColor: 'black', color: 'white' }}
                                className="px-3 py-1 rounded-md hover:bg-blue-600"
                            >
                                Annuler l'invitation
                            </InertiaLink>
                        </div>
                    ))}
                </div>



            </div>
        </div>
        </AuthenticatedLayout>
    );
}

export default ListeDesInvitations;
