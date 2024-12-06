<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use Illuminate\Notifications\Notification;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\DashboardController;
use Symfony\Component\HttpKernel\Profiler\Profile;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/liste-des-utilisateurs',[HomeController::class, 'index'])->name('listeDesUtilisateurs');
    Route::get('/invitations-envoyées',[HomeController::class, 'invitationsEnvoyees'])->name('invitation.envoyees');
    Route::get('/liste-des-amis',[HomeController::class, 'listeDesAmis'])->name('listedes.amis');
    Route::get('/liste-des-invitations',[HomeController::class, 'listeDesInvitationsRecus'])->name('invitations.recus');

    Route::get('/request/{user}',[HomeController::class, 'sendRequest'])->name('sendfriendrequest');

    Route::get('/request/{relationship}/{action}',[HomeController::class, 'friendRequests'])->name('friendrequests');

    Route::get('/profil', [ProfileController::class, 'profil'])->name('profil');
    Route::get('/notification', [NotificationController::class, 'notification'])->name('notification');

    Route::get('/my_posts', [ProfileController::class, 'getMyPosts']);
    Route::get('/friends_count', [ProfileController::class, 'getFriendsCount']);
    Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.show');

    Route::post('/change-avatar', [ProfileController::class, 'changeAvatar'])->name('change.avatar');

    Route::post('/posts', [PostController::class, 'store']);

    Route::get('dashboard', [PostController::class, 'index'])->name('dashboard');

    // routes/web.php



Route::get('/posts', [PostController::class, 'posts'])->name('posts.posts');



});

require __DIR__.'/auth.php';
