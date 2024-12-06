<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function notification()
    {
        return Inertia::render('Page_Front/Notification');
    }
}
