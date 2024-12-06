<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }


    /**
     * Update the user's profile information.
     */



    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
    public function profil()
    {
        $user = Auth::user();
        $friends = $user->friendRequests()->where('status', 'accepted')->with('receiver')->get()->map(function($friend){
            return $friend->receiver;
        });

        return Inertia::render('MyUserView', [
            'user' => $user,
            'friends' => $friends,
        ]);
    }
    public function show($id)
{
    // Logique pour récupérer et afficher le profil de l'utilisateur avec l'ID donné
    $user = User::findOrFail($id); // Exemple de récupération d'utilisateur par ID, ajustez selon votre modèle

    // Vous pouvez ajuster cette logique pour récupérer les amis de l'utilisateur si nécessaire
    $friends = $user->friendRequests()->where('status', 'accepted')->with('receiver')->get()->map(function($friend){
        return $friend->receiver;
    });
    return Inertia::render('AmisProfil', [
        'user' => $user,
        'friends' => $friends,
    ]);

    }
    public function changeAvatar(Request $request)
    {
        $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);

        // Récupérer l'utilisateur authentifié
        $user = Auth::user();

        // Supprimer l'ancien avatar si ce n'est pas le fichier par défaut
        if ($user->avatar && $user->avatar !== 'default-avatar.png') {
            Storage::delete('avatars/' . $user->avatar);
        }

        // Enregistrer le nouvel avatar
        $avatarName = time() . '.' . $request->avatar->getClientOriginalExtension();
        $request->avatar->move(public_path('avatars'), $avatarName);

        // Mettre à jour le champ avatar de l'utilisateur
        $user->avatar = $avatarName;
        $user->save();

        return redirect()->back()->with('success', 'Avatar mis à jour avec succès');
    }
}

