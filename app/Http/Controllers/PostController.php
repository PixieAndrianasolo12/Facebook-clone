<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        // Récupérer toutes les publications pour le tableau de bord (ou filtrer par utilisateur si nécessaire)
        $posts = Post::where('user_id', $user)->get();
        dd($posts); // Inclure l'utilisateur pour afficher les noms des utilisateurs

        return Inertia::render('Dashboard', [
            'posts' => $posts,
            'auth' => $user,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:255',
            'files.*' => 'file|mimes:jpg,jpeg,png,gif,mp4,mov,avi|max:10240',
        ]);

        $post = new Post();
        $post->user_id = auth()->user()->id;
        $post->content = $request->input('content');

        if ($request->hasFile('files')) {
            $files = [];
            foreach ($request->file('files') as $file) {
                $path = $file->store('uploads', 'public');
                $files[] = $path;
            }
            $post->files = json_encode($files); // Stocker les chemins des fichiers dans un champ JSON
        }

        $post->save();

        return redirect()->back()->with('success', 'Post created successfully.');
    }
    public function posts()
    {
        $posts = Post::all();
        return Inertia::render('PostsList', [
            'posts' => $posts,
        ]);
    }
}
