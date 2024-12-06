// Profil.jsx

import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfilePosts from './ProfilePosts';
import { getUserProfile } from './api'; // Importer la fonction d'API pour récupérer le profil

function Profil() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Utiliser une fonction asynchrone pour récupérer les données du profil
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(); // Appel à votre fonction d'API pour récupérer les données du profil
        setUser(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Afficher un message de chargement pendant le chargement des données du profil
  }

  return (
    <div className="profile-page">
      <ProfileHeader user={user} />
      <div className="profile-body">
        <div className="profile-about">
          <h2>About Me</h2>
          <p>{user.bio}</p>
        </div>
        <div className="profile-posts">
          <h2>My Posts</h2>
          <ul>
            {user.posts.map(post => (
              <li key={post.id}>{post.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profil;
