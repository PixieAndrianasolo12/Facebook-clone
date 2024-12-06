// resources/js/Pages/PostsList.jsx

import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

const PostsList = ({ posts }) => {
    return (
        <div className="container">
            <h1>Liste des Posts</h1>
            {posts.length === 0 ? (
                <p>Aucun post disponible.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titre</th>
                            <th>Contenu</th>
                            <th>Date de Création</th>
                            <th>Date de Mise à Jour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>{new Date(post.created_at).toLocaleDateString()} {new Date(post.created_at).toLocaleTimeString()}</td>
                                <td>{new Date(post.updated_at).toLocaleDateString()} {new Date(post.updated_at).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PostsList;
