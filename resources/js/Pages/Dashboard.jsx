import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, usePage } from '@inertiajs/react';
import CreatePost from '../Pages/createpost'; // Assurez-vous que le chemin est correct

const Dashboard = ({ auth }) => {
    const { props } = usePage();
    const { posts } = props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <SidebarLayout user={auth.user}>
                {/* Contenu de la barre latérale */}
            </SidebarLayout>

            {/* Contenu principal */}
            <CreatePost />

            <div>
                <h2>Dashboard</h2>
                {posts && posts.length > 0 ? (
                    <div>
                        {posts.map((post) => (
                            <div key={post.id}>{post.id}</div>
                        ))}
                    </div>
                ) : (
                    <div>not found</div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
