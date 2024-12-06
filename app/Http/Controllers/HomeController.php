<?php

namespace App\Http\Controllers;

use App\Models\Relationship;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
{
    $authUser = Auth::user();
    $authUserId = $authUser->id;

    // Obtenez les ID des utilisateurs qui sont déjà amis
    $friendIds = Relationship::where(function ($query) use ($authUserId) {
        $query->where('sender_id', $authUserId)
            ->orWhere('receiver_id', $authUserId);
    })
        ->where('status', 'accepted')
        ->pluck('sender_id')
        ->merge(Relationship::where(function ($query) use ($authUserId) {
            $query->where('sender_id', $authUserId)
                ->orWhere('receiver_id', $authUserId);
        })
            ->where('status', 'accepted')
            ->pluck('receiver_id'))
        ->unique();

    // Obtenez les utilisateurs qui ne sont pas l'utilisateur connecté et qui ne sont pas déjà amis
    $users = User::where('id', '!=', $authUserId)
        ->whereNotIn('id', $friendIds->toArray())
        ->get();

    // Obtenez les demandes d'amis de l'utilisateur connecté
    $friendRequests = $authUser->friendRequests()->get();

    return Inertia::render('listeDesUtilisateurs', [
        'users' => $users,
        'currentUser' => $authUser,
        'friendRequests' => $friendRequests,
    ]);
}

    public function listeDesAmis()
    {
        $users = Auth::user()
            ->friendRequests()
            ->with('sender', 'receiver')
            ->where('status', 'accepted')
            ->get();

        return Inertia::render('listeDesAmis', [
            'users' => $users,
        ]);
    }

    public function listeDesInvitationsRecus()
    {
        $users = Auth::user()
            ->friendRequestReceived()
            ->with('sender', 'receiver')
            ->where('status', 'pending')
            ->get();

        return Inertia::render('listeDesInvitationsRecus', [
            'users' => $users,
        ]);
    }

    public function invitationsEnvoyees()
    {
        $users = Auth::user()
            ->friendRequests()
            ->with('sender', 'receiver')
            ->where('status', 'pending')
            ->get();

        return Inertia::render('invitationsEnvoyees', [
            'users' => $users,
        ]);
    }

    public function sendRequest(User $user)
    {
        $authUserId = Auth::user()->id;

        // Vérifier si la relation existe dans un sens
        $checkIfExist = Relationship::where('sender_id', $authUserId)
            ->where('receiver_id', $user->id)
            ->first();

        // Vérifier si la relation existe dans l'autre sens
        $reverseRelationship = Relationship::where('sender_id', $user->id)
            ->where('receiver_id', $authUserId)
            ->first();

        if ($checkIfExist) {
            $checkIfExist->delete();

            if ($reverseRelationship) {
                $reverseRelationship->delete();
            }

            return redirect()->back()->with('success', 'Invitation annulée');
        } else {
            Relationship::create([
                'sender_id' => $authUserId,
                'receiver_id' => $user->id,
                'status' => 'pending'
            ]);

            return redirect()->back()->with('success', 'Invitation envoyée');
        }
    }

    public function friendRequests(Relationship $relationship, string $action)
    {
        $newStatus = $action === 'accept' ? 'accepted' : 'refused';
        $relationship->update(['status' => $newStatus]);

        if ($newStatus == 'accepted') {
            Relationship::create([
                'sender_id' => $relationship->receiver_id,
                'receiver_id' => $relationship->sender_id,
                'status' => 'accepted'
            ]);
        }

        return redirect()->back()->with('success', "La demande d'amitié a été {$newStatus}");
    }
}
