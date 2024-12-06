// ListeDesInvitationsRecus.jsx
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { InertiaLink } from '@inertiajs/inertia-react';

const ListeDesInvitationsRecus = ({ users, auth }) => {
    return (
        <AuthenticatedLayout user={auth.user} users={users}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-700 text-center mb-5">
                        Liste des Demandes ({users.length})
                    </h1>

                    {users.map((user) => (
                        user.receiver && (
                            <div key={user.id} className="bg-white p-4 shadow-md rounded-md flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <div className="mr-4">
                                        <img
                                            src={`/avatars/${user.sender.avatar}`}
                                            className="w-16 h-16 rounded-full object-cover"
                                            alt="Avatar"
                                        />
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-medium text-gray-700">{user.sender.name}</h1>
                                        <p className="text-gray-600">{user.sender.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <InertiaLink
                                        href={route('friendrequests',[user.id ,'accept'])}
                                        className="bg-yellow-500 px-3 py-1 rounded-md text-white hover:bg-yellow-600"
                                    >
                                        Accepter l'invitation
                                    </InertiaLink>
                                    <InertiaLink
                                        href={route('friendrequests',[user.id ,'refuse'])}
                                        className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-600 ml-2"
                                    >
                                        Refuser l'invitation
                                    </InertiaLink>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ListeDesInvitationsRecus;
